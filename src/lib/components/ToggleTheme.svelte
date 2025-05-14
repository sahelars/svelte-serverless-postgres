<script>
	let { classname, size = '20px' } = $props();

	let theme = $state('light');

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
		if (typeof window !== 'undefined') {
			const savedTheme = getCookie('theme');
			theme = savedTheme || 'light';
			document.documentElement.setAttribute('data-theme', theme);
		}
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
		setCookie('theme', theme);
	}
</script>

<button
	class={`relative inline-grid cursor-pointer mix-blend-difference invert ${classname}`}
	onclick={toggleTheme}
	aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
>
	<div
		class="ease-out-cubic-bezier col-start-1 row-start-1 transition-all duration-200"
		class:opacity-0={theme !== 'light'}
		class:rotate-45={theme !== 'light'}
		class:scale-0={theme !== 'light'}
	>
		<svg
			stroke-width="0"
			viewBox="0 0 24 24"
			height={size}
			width={size}
			xmlns="http://www.w3.org/2000/svg"
			><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"></path><path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
			></path></svg
		>
	</div>
	<div
		class="ease-out-cubic-bezier col-start-1 row-start-1 transition-all duration-200"
		class:opacity-0={theme !== 'dark'}
		class:rotate-45={theme !== 'dark'}
		class:scale-0={theme !== 'dark'}
	>
		<svg
			stroke-width="0"
			viewBox="0 0 24 24"
			height={size}
			width={size}
			xmlns="http://www.w3.org/2000/svg"
			><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"></path><path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
			></path></svg
		>
	</div>
</button>
