<script>
	import '../app.css';
	import ToggleTheme from '$lib/components/ToggleTheme.svelte';

	let { children } = $props();
</script>

<main>
	{@render children()}
</main>

<footer>
	<p class="mb-5">
		Made with ❤️ by <a href="https://github.com/sahelars" target="_blank" rel="noopener noreferrer"
			>Sam Larsen</a
		>
	</p>
	<ToggleTheme size="32px" />
</footer>
