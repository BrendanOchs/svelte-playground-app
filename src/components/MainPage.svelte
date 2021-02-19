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
</script>

<style>
    .container {
        display: flex;
    }

    .column,
    .column-center {
        border: 1px solid gray;
    }

    .column {
        width: 250px;
    }

    .column-center {
        flex-grow: 1; /* Set the middle element to grow and stretch */
        margin: 10px;
    }
</style>

<div class="container">
    <div class="column">
        <Search {segment} />
        <Reel {segment} />
        <Facts {segment} />
        <Counter {segment} />
    </div>
    <div class="column-center">
        <Steps {segment} />
        <Cta {segment} />
        <Pos {segment} />
    </div>
    <div class="column">
        <OfferCompletion {segment} />
    </div>
</div>
