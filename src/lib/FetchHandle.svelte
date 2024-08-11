<script lang="ts">
	let jsonData: any = null;
	let error: any = null;

	async function fetchData() {
		try {
			const response = await fetch("/api/fetchHandle", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ handle: "@DUNGEONCRAFT1" })
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

<button on:click={fetchData}>Fetch the handle data</button>

{#if error}
	<p>{error}</p>
{:else if jsonData}
	<pre>{JSON.stringify(jsonData, null, 2)}</pre>
{/if}
