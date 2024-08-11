<script lang="ts">
	import FetchVids from "$lib/FetchVids.svelte";
	import FetchHandle from "$lib/FetchHandle.svelte";

	let data: any = [];
	let handle: string = "@DUNGEONCRAFT1";

	async function fetchHandle() {
		const response = await fetch("/api/fetchHandle", {
			method: "POST",
			body: JSON.stringify({ handle }),
			headers: {
				"content-type": "application/json"
			}
		});

		data = await response.json();
	}
</script>

<h1>Get youtube data from the channel {handle}</h1>

<FetchHandle />
