<script>
	import Nav from "../components/Nav.svelte";
	import Reels from "../components/Reels.svelte";
import Table from "../components/Table.svelte";
	export let segment;
</script>

<Nav {segment} />

<main>
	<slot> </slot>
</main>
<Table/>