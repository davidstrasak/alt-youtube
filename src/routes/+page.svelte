<script lang="ts">
	import { onMount } from "svelte";
	let jsonData: any = { items: [] };
	let error: any = null;
	export let data;

	async function fetchVids() {
		try {
			const response = await fetch("/api/fetchVids", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				// body: JSON.stringify({ channelID: "UCD6ERRdXrF2IZ0R888G8PQg" })
				body: JSON.stringify({ channelID: "UCEKJKJ3FO-9SFv5x5BzyxhQ" })
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			jsonData = await response.json();
		} catch (err: any) {
			error = err.message;
		}
	}
</script>

<!-- <button on:click={fetchHandle}>Fetch the channel data</button> -->

<button on:click={fetchVids}>Fetch the video data</button>

{#each data.files && data.files as item}
	<iframe
		title="video"
		width="560"
		height="315"
		src="https://www.youtube.com/embed/{item.id.videoId}?rel=0&autoplay=0"
		frameborder="0"
		allowfullscreen
	></iframe>
{/each}
