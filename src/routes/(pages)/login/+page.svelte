<script>
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';

	let username = '';
	let password = '';
	let isSubmitting = false;
	let buttonDefaultText = 'Hold to login';
	let buttonText = buttonDefaultText;
	let buttonErrorText = 'Try again';

	async function handleLogin() {
		if (isSubmitting) return;
		isSubmitting = true;
		const animations = [
			setTimeout(() => {
				buttonText = buttonText + '.';
			}, 200),
			setTimeout(() => {
				buttonText = buttonText + '.';
			}, 400),
			setTimeout(() => {
				buttonText = buttonText + '.';
			}, 600)
		];
		try {
			const form = document.querySelector('form');
			const formData = new FormData(form);
			const response = await fetch('/login', {
				method: 'POST',
				headers: { accept: 'application/json' },
				body: formData
			});

			if (!response.ok) {
				animations.forEach(clearTimeout);
				buttonText = buttonErrorText;
			} else {
				const { location, type } = await response.json();
				if (type === 'redirect') {
					window.location.href = location;
					return;
				} else {
					setTimeout(() => {
						animations.forEach(clearTimeout);
						buttonText = buttonErrorText;
						username = '';
						password = '';
					}, 800);
				}
			}
		} catch (error) {
			animations.forEach(clearTimeout);
			console.error('Error submitting form:', error);
			buttonText = buttonErrorText;
		} finally {
			isSubmitting = false;
			setTimeout(() => {
				buttonText = buttonDefaultText;
				username = '';
				password = '';
			}, 2000);
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
		<Button outline on:click={() => (window.location.href = '/')}>Back</Button>
		<Button animation disabled={!username || !password} on:complete={handleLogin}>
			{buttonText}
		</Button>
	</div>
</div>
