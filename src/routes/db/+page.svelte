<script lang="ts">
	export let data;
	let channelName: string;
	let channelId: string;
	let tags: string;
	let error: any;

	async function handleSubmit() {
		try {
			const channel = {
				channelName,
				channelId,
				tags
			};
			await fetch("/api/submitChannel", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(channel)
			});
			location.reload();
		} catch (e) {
			error = e;
		}
	}

	async function removeChannel(channelName: string, channelId: string, tags: string) {
		const channel = {
			channelName,
			channelId,
			tags
		};
		await fetch("/api/removeChannel", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(channel)
		});
		location.reload();
	}
</script>

{#if error}
	<p>{error.message}</p>
{/if}

<h1 class="text-3xl">Add a database entry</h1>
<br />
<form on:submit|preventDefault={handleSubmit} class="w-full flex flex-row">
	<div class="w-2/6 flex flex-row items-center mx-4 gap-4">
		<label class="" for="channelName">Channel Name:</label>
		<input
			type="text"
			id="channelName"
			class="input input-accent flex-grow"
			bind:value={channelName}
		/>
	</div>

	<div class="w-2/6 flex flex-row items-center mx-4 gap-4">
		<label for="channelId">Channel ID:</label>
		<input type="text" id="channelId" class="input input-accent flex-grow" bind:value={channelId} />
	</div>

	<div class="w-3/12 flex flex-row items-center mx-4 gap-4">
		<label for="tags">tags:</label>
		<input type="text" id="tags" class="input input-accent flex-grow" bind:value={tags} />
	</div>

	<div class="w-1/6">
		<button class="btn btn-outline btn-accent" type="submit">Submit</button>
	</div>
</form>
<br />
<br />

<h1 class="text-3xl">Go through the existing entries</h1>
<br />
<table class="table-fixed w-full">
	<thead class="text-left text-secondary">
		<tr>
			<th class="w-2/6">Channel Name</th>
			<th class="w-2/6">Channel ID</th>
			<th class="w-1/6">Tags</th>
			<th class="w-1/6">Buttons</th>
		</tr>
	</thead>
	<tbody class="">
		{#each data.channels as { channelName, channelId, tags }}
			<tr>
				<td>{channelName}</td>
				<td>{channelId}</td>
				<td>{tags}</td>
				<button
					class="btn btn-secondary btn-outline"
					on:click={() => removeChannel(channelName, channelId, tags)}>Remove</button
				>
			</tr>
		{/each}
	</tbody>
</table>
