<script>
    import movies from './_movies.js'
</script>

<style>
    h4, h6, p {
        margin: 0;
    }

    h4 {
        font-size: 30px;
    }

    h6 {
        font-size: 20px;
    }

    h6, p, button {
        margin-top: 10px;
    }
    .flex-item {
        background-color: #dadada;
        border: 1px #000000 solid;
    }
</style>

<div class="flex-container">
    {#each movies as movie}
    <div class="flex-item text-center">
        <h4>{movie.name}</h4>
        <p>{movie.genre}</p>
        <h6>"{movie.slogan}"</h6>
        <a href="inventory/{movie.id}"><button>See Details</button></a>
    </div>
    {/each}
</div>