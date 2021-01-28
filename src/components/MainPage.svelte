<style>
    .flex-container {
        display: flex; /* or inline-flex */
    }
    
    .flex-item {
        background-color: white;
        border: 2px dashed grey;
        width: 20%;
        height: 700px;
        margin: 5px;
    }

    .flex-item.center{
        flex-grow: 2;
    }

</style>

<div class="flex-container">
    <div class="flex-item">1</div>
    <div class="flex-item">2</div>
    <div class="flex-item">3</div>
    <div class="flex-item">3</div>
</div>
