<script>
	let {
		href = null,
		onclick = null,
		outline = false,
		animation = false,
		onanimationend = null,
		disabled = false,
		children
	} = $props();

	const tag = href ? 'a' : 'button';

	function handleAnimationEnd(event) {
		if (event.animationName === 'btn-animation' && onanimationend) {
			onanimationend(event);
		}
	}
</script>

<svelte:element
	this={tag}
	role="button"
	tabindex="0"
	class="btn {outline && 'outline'} {animation && 'animation'}"
	onanimationend={handleAnimationEnd}
	{href}
	{onclick}
	{disabled}
>
	<span class="flex items-center justify-center">{@render children?.()}</span>
</svelte:element>
