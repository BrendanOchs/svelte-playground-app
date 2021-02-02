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
        margin-left: auto;
        margin-right: auto;
        width: 90%;
    }
    .norm-fw {
        font-weight: 500;
    }
    .text-left {
        text-align: left;
    }
</style>

<a href="inventory"><button>←</button></a>
<h1>
{#await promise}
    <h4 class="text-center">Loading...</h4>
{:then movie}
    <div class="text-center">
        <h3><i>{movie.name}</i></h3>
        <h6 class="norm-fw">{movie.genre}</h6>
        <h4 class="norm-fw">"{movie.slogan}"</h4>
        <h6 class="spacing norm-fw text-left">{movie.desc}</h6>
    </div>
{/await}
</h1>