<script>
	import Button from '$lib/components/Button.svelte';

	let isSubmitting = $state(false);

	async function handleLogout() {
		if (isSubmitting) return;
		try {
			isSubmitting = true;
			let response = await fetch('/api/logout', {
				method: 'POST'
			});
			if (!response.ok) {
				console.error('Error logging out');
			} else {
				window.location.href = '/login';
			}
		} catch (error) {
			console.error('Error logging out');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Welcome to Svelte" />
</svelte:head>

<div class="align-center flex flex-col gap-3 text-center transition-all duration-300">
	<h1>Dashboard</h1>
	<p class="mb-5">
		Visit <a href="https://lucia-auth.com" target="_blank" rel="noopener noreferrer"
			>lucia-auth.com</a
		>
		to read the auth docs and
		<a href="https://neon.tech" target="_blank" rel="noopener noreferrer">neon.tech</a> to read the database
		docs
	</p>
	<Button
		classname="w-[218px]"
		animation
		text="Hold to logout"
		errorText="Try again"
		oncomplete={handleLogout}
	/>
</div>
