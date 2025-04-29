<script>
	import '../app.css';

	let { children } = $props();
</script>

<main>
	{@render children()}
</main>

<footer>
	<p>
		Made with ❤️ by <a href="https://github.com/sahelars" target="_blank" rel="noopener noreferrer"
			>Sam Larsen</a
		>
	</p>
</footer>
