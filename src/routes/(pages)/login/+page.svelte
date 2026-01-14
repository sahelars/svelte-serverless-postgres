<script>
	import Button from '$lib/components/Button.svelte';
	import Loading from '$lib/components/Loading.svelte';

	let username = $state('');
	let password = $state('');
	const buttonClickText = 'Hold to login';
	const buttonErrorText = 'Try again';
	let buttonText = $state(buttonClickText);
	let isSubmitting = $state(false);
	let errorTimeout;

	function showErrorTemporarily() {
		clearTimeout(errorTimeout);
		buttonText = buttonErrorText;
		errorTimeout = setTimeout(() => {
			buttonText = buttonClickText;
		}, 3000);
	}

	async function handleLogin() {
		if (isSubmitting) return;
		isSubmitting = true;
		try {
			const form = document.querySelector('form');
			const formData = new FormData(form);
			username = '';
			password = '';
			const response = await fetch('/login', {
				method: 'POST',
				headers: { accept: 'application/json' },
				body: formData
			});
			const result = await response.json();
			if (result.type === 'redirect') {
				window.location.href = result.location;
				return;
			} else {
				showErrorTemporarily();
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			showErrorTemporarily();
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Welcome to Svelte" />
</svelte:head>

<div class="align-center flex flex-col gap-3 text-center transition-all duration-300">
	<h1>Serverless Login</h1>
	<p class="mb-5">
		Visit <a href="https://lucia-auth.com" target="_blank" rel="noopener noreferrer"
			>lucia-auth.com</a
		>
		to read the auth docs and
		<a href="https://neon.tech" target="_blank" rel="noopener noreferrer">neon.tech</a> to read the database
		docs
	</p>
	<form class="flex w-full max-w-md flex-col gap-3">
		<input class="input" bind:value={username} name="username" placeholder="Username" required />
		<input
			class="input mb-5"
			bind:value={password}
			name="password"
			placeholder="Password"
			type="password"
			required
		/>
	</form>
	<div class="grid w-full max-w-md grid-cols-2 gap-3">
		<Button outline onclick={() => (window.location.href = '/')}>Back</Button>
		<Button animation onanimationend={() => handleLogin()} disabled={!username || !password}>
			<span class="relative inline-flex items-center justify-center">
				<span class:invisible={isSubmitting}>{buttonText}</span>
				{#if isSubmitting}
					<span class="absolute inset-0 flex items-center justify-center">
						<Loading size={20} />
					</span>
				{/if}
			</span>
		</Button>
	</div>
</div>
