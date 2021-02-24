<script>
    import Steps from "./Steps.svelte";
    import Search from "./Search.svelte";
    import Facts from "./Facts.svelte";
    import Counter from "./Counter.svelte";
    import Reel from "./Reel.svelte";
    import OfferCompletion from "./OfferCompletion.svelte";
    import Cta from "./Cta.svelte";
    import Pos from "./Pos.svelte";
    export let segment;
    import ProgressBar from "../components/ProgressBar.svelte";
    import Table from "./Table.svelte"
    
</script>

<style>
</style>

<div class="flex-container">
    <div class="flex-item left">
        <Search {segment} />
        <Reel {segment} />
        <Facts {segment} />
        <Counter {segment} />
    </div>
    <div class="flex-item center">
        <Steps {segment} />
        <Cta {segment} />
        <Pos {segment} />
    </div>
    <div class="flex-item right">
        <OfferCompletion {segment} />
    </div>
</div>

