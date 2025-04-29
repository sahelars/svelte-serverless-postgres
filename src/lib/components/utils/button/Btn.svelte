<script>
	import { onMount } from 'svelte';

	export let outline = false;
	export let disabled = false;
</script>

<button class="btn {outline && 'outline'}" {disabled} on:click><slot /></button>
