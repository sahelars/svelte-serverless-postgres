<script>
	let { outline = false, disabled = false, onclick, children } = $props();
</script>

<button class="btn {outline && 'outline'}" {disabled} {onclick}>{@render children()}</button>
