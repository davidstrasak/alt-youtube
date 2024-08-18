<script lang="ts">
	import "../app.css";
	import { onMount, afterUpdate } from "svelte";

	let searchQuery = "";

	function handleSubmit() {}

	let headerObject: any;
	let contentObject: any;
	let entireHeight: string;
	let headerHeight: string;
	function setBoundaries() {
		entireHeight = contentObject.clientHeight + headerObject.clientHeight + 10 + "px";
		headerHeight = headerObject.clientHeight + "px";
	}
	onMount(() => {
		addEventListener("resize", setBoundaries);
		addEventListener("click", setBoundaries);
		return () => {
			window.removeEventListener("resize", setBoundaries); // cleanup
			window.removeEventListener("click", setBoundaries);
		};
	});
	afterUpdate(() => {
		if (contentObject) {
			setBoundaries();
		}
	});
</script>

<main style="height: {entireHeight}" class="bg-base-300">
	<header class="fixed top-0 left-0 right-0 z-50 bg-base-100 shadow-md" bind:this={headerObject}>
		<div class="container mx-auto flex items-center justify-between py-4 gap-6">
			<a href="/" class="btn btn-ghost normal-case text-xl">ForesTube</a>
			<form on:submit|preventDefault={handleSubmit} class="flex-1">
				<input
					type="text"
					name="search"
					class="input input-primary w-full"
					placeholder="Search"
					bind:value={searchQuery}
				/>
			</form>
			<a href="/db" class="btn btn-primary">UPDATE THE LIST OF CHANNELS</a>
		</div>
	</header>

	<div
		class="container mx-auto relative"
		bind:this={contentObject}
		style="top: {headerHeight ?? 80 + 'px'}"
	>
		<slot />
	</div>
</main>
