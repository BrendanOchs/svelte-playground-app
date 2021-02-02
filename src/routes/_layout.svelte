<script>
	import Nav from "../components/Nav.svelte";
	import Reels from "../components/Reels.svelte";
	export let segment;
	function pageSwitch(){
        let i = 0;
        i++;
        console.log(i);
    }
</script>

<Nav {segment} />

<main>
	<slot> </slot>
</main>
