<script lang="ts">
	import he from "he";

	export let data;
	let { ChannelIDs } = data;
	let jsonData: any = { items: [] }; // this is unused atm but if need to stringify the data on the site I can use this
	let error: any = null;
	data.files.forEach((item: any) => {
		item.channelName = findChannelName(item.snippet.channelId);
	});

	let channel: any = ChannelIDs[0];
	let filter: string = "Latest";

	let tags = ["Latest", ...ChannelIDs.map((channel) => channel.tags).sort()];
	let uniqueTags = [...new Set(tags)];
	uniqueTags.map((tag) => {
		if (tag === "all") {
			uniqueTags.splice(uniqueTags.indexOf(tag), 1);
		}
	});

	$: filteredData = data.files.filter((item: any) => {
		if (filter === "Latest") {
			return true; // Include all items if filter is "Latest"
		} else {
			return ChannelIDs.find((channel) => channel.channelName === item.channelName)?.tags.includes(
				filter
			);
		}
	});

	async function fetchVids() {
		try {
			const response = await fetch("/api/fetchVids", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ channelID: channel.channelId, channelName: channel.channelName })
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			jsonData = await response.json();

			await location.reload();
		} catch (err: any) {
			error = err.message;
		}
	}

	function decodeHtmlEntities(text: string): string {
		return he.decode(text);
	}

	function findChannelName(channelId: string) {
		const channel = ChannelIDs.find((channel) => channel.channelId === channelId);

		return channel?.channelName;
	}
</script>

{#if error}
	<p class="text-xl">Error: {error}</p>
{/if}

<div class="w-full">
	<select class="select select-lg w-full max-w-80" bind:value={channel}>
		{#each ChannelIDs as channelID}
			<option value={channelID}>{channelID.channelName}</option>
		{/each}
	</select>
	<button on:click={fetchVids} class="btn btn-lg my-10 mx-auto btn-primary"
		>Fetch the video data</button
	>
</div>

<div
	class="flex flex-row gap-6 mb-6 navbar bg-neutral rounded-box w-full justify-center md:justify-normal"
>
	{#each uniqueTags as tag}
		<button
			class="btn {filter === tag ? 'btn-primary' : ''}"
			on:click={() => {
				filter = tag;
			}}>{tag}</button
		>
	{/each}
</div>

<div class="grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4">
	{#if data.files}
		{#each filteredData as item}
			<div class="mx-auto" style="width: 320px">
				<p class="font-bold text-accent mb-1">{decodeHtmlEntities(item.snippet.title)}</p>
				<!-- Generate a link to the dynamic route with the videoId -->
				<a href={`/videos/${item.id.videoId}`} target="_blank">
					<img
						src={item.snippet.thumbnails.medium.url}
						alt={item.snippet.title}
						class="rounded-box"
					/>
				</a>
				<p class="font-bold text-secondary">{item.channelName}</p>
				<p class="text-justify">{decodeHtmlEntities(item.snippet.description)}</p>
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
</div>
