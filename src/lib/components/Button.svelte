<script>
	import { onMount } from 'svelte';
	import Btn from '$lib/components/utils/button/Btn.svelte';
	import BtnAnimation from '$lib/components/utils/button/BtnAnimation.svelte';

	export let animation = false;
	export let outline = false;
	export let duration = 2000;
	export let disabled = true;

	onMount(() => {
		if (!('disabled' in $$props)) {
			setTimeout(() => {
				disabled = false;
			}, 500);
		}
	});
</script>

{#if animation}
	<BtnAnimation {disabled} {duration} on:complete>
		<slot />
	</BtnAnimation>
{:else}
	<Btn {outline} {disabled} on:click>
		<slot />
	</Btn>
{/if}
