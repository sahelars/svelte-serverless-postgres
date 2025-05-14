<script>
	import Button from '$lib/components/Button.svelte';

	let username = $state('');
	let password = $state('');
	let isSubmitting = $state(false);

	async function handleLogin() {
		if (isSubmitting) return;
		isSubmitting = true;
		try {
			const form = document.querySelector('form');
			const formData = new FormData(form);
			const response = await fetch('/login', {
				method: 'POST',
				headers: { accept: 'application/json' },
				body: formData
			});

			if (!response.ok) {
				buttonText = buttonErrorText;
			} else {
				const { location, type } = await response.json();
				if (type === 'redirect') {
					window.location.href = location;
					return;
				}
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			buttonText = buttonErrorText;
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
		<Button
			animation
			text="Hold to login"
			errorText="Try again"
			disabled={true}
			oncomplete={handleLogin}
		/>
	</div>
</div>
