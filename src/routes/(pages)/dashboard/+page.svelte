<script>
	import Button from '$lib/components/Button.svelte';
	import Loading from '$lib/components/Loading.svelte';

	const buttonClickText = 'Hold to logout';
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

	async function handleLogout() {
		if (isSubmitting) return;
		try {
			isSubmitting = true;
			let response = await fetch('/api/logout', {
				method: 'POST'
			});
			const result = await response.json();
			if (result.type === 'redirect') {
				window.location.href = result.location;
			} else {
				showErrorTemporarily();
			}
		} catch (error) {
			console.error('Error logging out:', error);
			showErrorTemporarily();
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
	<div>
		<Button animation onanimationend={() => handleLogout()} disabled={isSubmitting}>
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
