<script>
import Crud from "../components/Crud.svelte";

	import Nav from "../components/Nav.svelte";
	import Reel from "../components/Reel.svelte";
	import Table from "../components/Table.svelte";
	export let segment;
</script>

<Nav {segment} />

<main>
	<slot> </slot>
</main>
