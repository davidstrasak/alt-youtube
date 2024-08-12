<script lang="ts">
	import { ChannelIDs } from "$lib/ChannelIDs.js";
	import he from "he";

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

	function decodeHtmlEntities(text: string): string {
		return he.decode(text);
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

{#if data.files}
	{#each data.files as item}
		<div class="video-item">
			<!-- Generate a link to the dynamic route with the videoId -->
			<a href={`/videos/${item.id.videoId}`} target="_blank">
				<img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
			</a>
			<p>{decodeHtmlEntities(item.snippet.title)}</p>
			<p>
				Publikováno: {new Date(item.snippet.publishedAt).getDate()}.{new Date(
					item.snippet.publishedAt
				).getMonth() + 1}.{new Date(item.snippet.publishedAt).getFullYear()} v {new Date(
					item.snippet.publishedAt
				).getHours()}h
			</p>
		</div>
	{/each}
{/if}
