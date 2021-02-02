<script context="module">
    let id;
    var promise;
    export async function preload(page, session) {
        id = page.params.id
        promise = (async () => {
	    const res = await this.fetch(`inventory/${id}.json`)
        return await res.json()
	})()
    }
</script>

<style>
    button {
        font-size: 30px;
    }
    .spacing {
        margin: 20px;
    }
</style>

<a href="inventory"><button>←</button></a>
<h1>
{#await promise}
    <h1>Loading...</h1>
{:then movie}
    <div class="text-center">
        <h3>{movie.name}</h3>
        <h6>{movie.genre}</h6>
        <h4>"{movie.slogan}"</h4>
        <h6 class="spacing">{movie.desc}</h6>
    </div>
{/await}
</h1>