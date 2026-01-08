<script>
	let {
		href = null,
		onclick = null,
		outline = false,
		animation = false,
		disabled = false,
		children
	} = $props();

	const tag = href ? 'a' : 'button';
</script>

<svelte:element
	this={tag}
	role="button"
	tabindex="0"
	class="btn {outline && 'outline'} {animation && 'animation'}"
	{href}
	{onclick}
	{disabled}
>
	<span>{@render children?.()}</span>
</svelte:element>
