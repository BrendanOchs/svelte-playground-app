<script>
	import Nav from "../components/Nav.svelte";
	import Table from "./_Table.svelte"
	import Crud from "./_Crud_RominaBranch.svelte";

	export let segment;
</script>

<Nav {segment} />

<main>
	<slot />
</main>

<Crud/>

