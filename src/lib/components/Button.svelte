<script>
	import Btn from '$lib/components/utils/Btn.svelte';
	import BtnAnimation from '$lib/components/utils/BtnAnimation.svelte';

	let {
		classname = '',
		animation = false,
		text = 'Hold',
		errorText = 'Error',
		duration = 2000,
		outline = false,
		disabled = false,
		onclick,
		oncomplete,
		children
	} = $props();

	let isDisabled = $state(true);

	$effect(() => {
		setTimeout(() => {
			isDisabled = false;
		}, 500);
	});
</script>

{#if animation}
	<BtnAnimation {classname} {text} {errorText} {duration} {oncomplete} {disabled} />
{:else}
	<Btn {classname} {outline} {onclick} disabled={isDisabled || disabled}>
		{@render children?.()}
	</Btn>
{/if}
