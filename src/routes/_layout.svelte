<script>
	import Nav from '../components/Nav.svelte';
	import ShowHideButton from '../components/_showHideButton.svelte';
	import ElvisCode from '../components/_ElvisCode.svelte';
	import Crud from './_Crud.svelte';
	import LoganCode from './_LoganCrudCode.svelte'

	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>

<!-- <ShowHideButton/>
<ElvisCode/> -->

<!-- <LoganCode/> -->
<Crud/>

