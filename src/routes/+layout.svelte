<script>
	import '../app.css';

	let { children } = $props();

	function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}

	function setCookie(name, value, days = 365) {
		const expires = new Date(Date.now() + days * 864e5).toUTCString();
		document.cookie = `${name}=${value}; expires=${expires}; path=/`;
	}

	$effect(() => {
		const setTheme = () => {
			const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const theme = isDark ? 'dark' : 'light';
			setCookie('svelte_theme', theme);
			document.documentElement.setAttribute('data-theme', theme);
		};
		setTheme();
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', setTheme);
		return () => {
			mediaQuery.removeEventListener('change', setTheme);
		};
	});
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
</footer>
