<script>
    export let segment;
    let counter = 0;
    function counterInc()
    {
        counter++;
    }
</script>

<style>
    div {
        border: 1px solid gray;
        border-radius: 2px;
    }
    button {
        border: 1px solid #9c9c9c;
        border-radius: 3px;
    }
</style>

<div><button on:click={counterInc}>Test INC</button>
<p>{counter}</p></div>
