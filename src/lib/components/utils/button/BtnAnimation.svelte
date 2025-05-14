<script>
	import Loading from '$lib/components/Loading.svelte';

	let { classname, text, errorText, duration, disabled, oncomplete } = $props();

	let currentButtonText = $state(text);
	let isHolding = $state(false);
	let holdProgress = $state(0);
	let showProgress = $state(false);
	let animationFrame = $state(null);
	let isSubmitting = $state(false);
	let textFrames = $state([]);
	let isError = $state(false);
	let showLoading = $state(false);

	function startHolding() {
		if (disabled && isError) return;
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
				showLoading = true;
				textFrames = [
					setTimeout(() => {
						showLoading = false;
						holdProgress = 0;
						showProgress = false;
						disabled = true;
						isError = true;
						showLoading = false;
						currentButtonText = errorText;
						document.querySelector('form')?.reset();
					}, 2000),
					setTimeout(() => {
						holdProgress = 0;
						showProgress = false;
						isError = false;
						currentButtonText = text;
					}, 4600)
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
	class={`btn hold ${classname}`}
	type="button"
	onmousedown={startHolding}
	onmouseup={stopHolding}
	onmouseleave={stopHolding}
	ontouchstart={(e) => {
		e.preventDefault();
		startHolding();
	}}
	ontouchend={(e) => {
		e.preventDefault();
		stopHolding();
	}}
	ontouchcancel={(e) => {
		e.preventDefault();
		stopHolding();
	}}
	disabled={disabled || isError}
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
