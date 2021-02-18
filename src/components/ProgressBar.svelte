<script>
    export let percent;
    export let color;
</script>

<style>
    #buffer {
        width: 100%;
        height: 10px;
        background: #c9c9c9;
    }
    #bar {
        margin-left: 0;
        margin-right: auto;
        height: 10px;
    }
</style>

<div id="buffer">
    <div id="bar" style="background: {color}; width: {percent}%;" />
</div>
