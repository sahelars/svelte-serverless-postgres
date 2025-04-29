<script>
	import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
	<title>Svelte</title>
	<meta name="description" content="Welcome to Svelte" />
</svelte:head>

<div class="align-center flex flex-col gap-3 text-center transition-all duration-300">
	<h1>Welcome to Svelte</h1>
	<p class="mb-5">
		Visit <a
			href="https://github.com/sahelars/svelte-serverless-postgres"
			target="_blank"
			rel="noopener noreferrer">svelte-serverless-postgres</a
		> to read the documentation
	</p>
	<Button on:click={() => (window.location.href = '/login')}>Get started</Button>
</div>
