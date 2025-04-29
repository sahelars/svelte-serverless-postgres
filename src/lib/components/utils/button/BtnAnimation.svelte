<script>
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let disabled = false;
	export let duration = 2000;

	let isHolding = false;
	let holdProgress = 0;
	let holdInterval;
	let showProgress = false;

	function startHolding() {
		if (disabled) return;
		isHolding = true;
		showProgress = true;
		holdProgress = 0;
		const startTime = Date.now();
		holdInterval = setInterval(() => {
			const elapsed = Date.now() - startTime;
			holdProgress = Math.min(elapsed / duration, 1);
			if (holdProgress >= 1) {
				clearInterval(holdInterval);
				isHolding = false;
				dispatch('complete');
			}
		}, 16);
	}

	function stopHolding() {
		if (holdInterval) clearInterval(holdInterval);
		isHolding = false;
		if (holdProgress < 1) {
			holdProgress = 0;
			showProgress = false;
		}
	}

	onDestroy(() => {
		if (holdInterval) clearInterval(holdInterval);
	});
</script>

<button
	class="btn hold"
	type="button"
	on:mousedown={startHolding}
	on:mouseup={stopHolding}
	on:mouseleave={stopHolding}
	on:touchstart|preventDefault={startHolding}
	on:touchend|preventDefault={stopHolding}
	on:touchcancel|preventDefault={stopHolding}
	{disabled}
>
	{#if showProgress}
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<div class="progress" style="width: {holdProgress * 100}%" />
	{/if}
	<span class="mix-blend-exclusion">
		<slot />
	</span>
</button>
