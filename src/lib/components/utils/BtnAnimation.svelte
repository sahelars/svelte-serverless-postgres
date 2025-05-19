<script>
	import Loading from '$lib/components/Loading.svelte';

	let { classname, text, errorText, duration, disabled, oncomplete } = $props();

	let currentButtonText = $state(text);
	let isHolding = $state(false);
	let holdProgress = $state(0);
	let showProgress = $state(false);
	let animationFrame = $state(null);
	let textFrames = $state([]);
	let showLoading = $state(false);
	let overrideDisabled = $state(disabled);

	function startHolding() {
		if (disabled) return;
		isHolding = true;
		showProgress = true;
		holdProgress = 0;
		const startTime = Date.now();
		function update() {
			const elapsed = Date.now() - startTime;
			holdProgress = Math.min(elapsed / duration, 1);
			if (holdProgress < 1) {
				animationFrame = requestAnimationFrame(update);
			} else {
				isHolding = false;
				oncomplete?.();
				overrideDisabled = false;
				showLoading = true;
				textFrames = [
					setTimeout(() => {
						overrideDisabled = true;
						showLoading = false;
						showProgress = false;
						holdProgress = 0;
						currentButtonText = errorText;
						document.querySelector('form')?.reset();
					}, 6000),
					setTimeout(() => {
						currentButtonText = text;
					}, 9000)
				];
			}
		}
		animationFrame = requestAnimationFrame(update);
	}

	function stopHolding() {
		if (animationFrame !== null) {
			cancelAnimationFrame(animationFrame);
			animationFrame = null;
		}
		isHolding = false;
		if (holdProgress < 1) {
			holdProgress = 0;
			showProgress = false;
		}
	}

	$effect(() => {
		const form = document.querySelector('form');
		checkFormValues();
		function checkFormValues() {
			if (!form) return;
			const formData = new FormData(form);
			if (formData.get('username') && formData.get('password')) {
				disabled = false;
			} else {
				disabled = true;
			}
		}
		function handleInput() {
			checkFormValues();
		}
		form?.addEventListener('input', handleInput);
		return () => {
			form?.removeEventListener('input', handleInput);
			if (animationFrame !== null) {
				cancelAnimationFrame(animationFrame);
			}
			textFrames.forEach(clearTimeout);
		};
	});
</script>

<button
	class={`btn hold ${classname} ${showLoading ? 'cursor-default' : ''}`}
	type="button"
	onpointerdown={startHolding}
	onpointerup={stopHolding}
	onpointerleave={stopHolding}
	onpointercancel={stopHolding}
	disabled={disabled && overrideDisabled}
>
	{#if showProgress}
		<div
			class="progress"
			style="width: {holdProgress * 100}%; transition: width 0.1s linear;"
		></div>
	{/if}
	<span class="flex items-center justify-center">
		<span class={`${!showLoading ? 'block opacity-100' : 'hidden opacity-0'}`}
			>{currentButtonText}</span
		>
		<span class={`${showLoading ? 'block opacity-100' : 'hidden opacity-0'}`}><Loading /></span>
	</span>
</button>
