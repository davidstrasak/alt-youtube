<script>
	import "../app.css";

	let searchQuery = "";

	function handleSubmit() {}
</script>

<header class="fixed top-0 left-0 right-0 z-50 bg-primary text-white shadow-md">
	<div class="container mx-auto flex items-center justify-between py-4">
		<a href="/" class="btn btn-ghost normal-case text-xl">Your Website Name</a>
		<form on:submit|preventDefault={handleSubmit} class="flex-1">
			<input
				type="text"
				name="search"
				class="input input-bordered w-full"
				placeholder="Search"
				bind:value={searchQuery}
			/>
		</form>
	</div>
</header>

<main class="container m-10">
	<slot />
</main>
<!-- testing git -->
