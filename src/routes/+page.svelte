<script lang="ts">
	import { ChannelIDs } from "$lib/ChannelIDs.js";

	let jsonData: any = { items: [] };
	let error: any = null;
	let channel: any = ChannelIDs[0];
	export let data;

	async function fetchVids() {
		try {
			const response = await fetch("/api/fetchVids", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ channelID: channel.ID, channelName: channel.name })
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			jsonData = await response.json();
		} catch (err: any) {
			error = err.message;
		} finally {
			location.reload();
		}
	}
</script>

{#if error}
	<p>Error: {error}</p>
{/if}

<select bind:value={channel}>
	{#each ChannelIDs as channelID}
		<option value={channelID}>{channelID.name}</option>
	{/each}
</select>

<button on:click={fetchVids} class="btn btn-lg m-10">Fetch the video data</button>

{#each data.files && data.files as item}
	<p>
		Publikováno: {new Date(item.snippet.publishedAt).getDate()}.{new Date(
			item.snippet.publishedAt
		).getMonth()}.{new Date(item.snippet.publishedAt).getFullYear()} v {new Date(
			item.snippet.publishedAt
		).getHours()}h
	</p>
	<iframe
		title="video"
		width="560"
		height="315"
		src="https://www.youtube.com/embed/{item.id.videoId}?rel=0&autoplay=0"
		frameborder="0"
		allowfullscreen
	></iframe>
{/each}
