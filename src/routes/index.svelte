<script>
	import MainPage from "../components/MainPage.svelte";
	export let segment;
</script>

<svelte:head>
	<title>Sapper project template</title>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
</svelte:head>

<MainPage {segment} />
