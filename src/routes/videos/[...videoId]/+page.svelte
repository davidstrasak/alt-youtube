<script lang="ts">
	// The `videoId` variable is populated with the ID from the URL
	export let data;
</script>

<!-- Embed the YouTube video using the captured videoId -->
<iframe
	title="video"
	width="560"
	height="315"
	src={`https://www.youtube.com/embed/${data.videoId}?rel=0&autoplay=0`}
	frameborder="0"
	allowfullscreen
></iframe>
