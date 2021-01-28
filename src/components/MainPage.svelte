<style>
    .flex-container {
        display: flex; /* or inline-flex */
        align-items: stretch;
        flex-wrap: wrap;
    }
    
    .flex-item {
        background-color: white;
        border: 2px dashed grey;
        width: 20%;
        margin: 5px;
    }

    .flex-item.center{
        flex-grow: 2;
        min-width: 601px;
    }

    /* width of phone would be about 600px so do a min-width for that I guess */

</style>

<div class="flex-container">
    <div class="flex-item">1</div>
    <div class="flex-item">2</div>
    <div class="flex-item">3</div>
    <div class="flex-item">3</div>
</div>
