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

<script>
    import IconButton from '@smui/icon-button';
</script>

<style>
    @import "@material/typography/mdc-typography";
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
    iframe {
        width: 100%;
        height: 600px;
    }
</style>

<a href="inventory"><IconButton class="material-icons">west</IconButton></a>
<h1>
{#await promise}
    <h4 class="text-center">Loading...</h4>
{:then movie}
    <div class="text-center">
        <iframe src={movie.trailer} title="Movie Trailer"/>
        <h3 class="mdc-typography--headline3"><i>{movie.name}</i></h3>
        <h6 class="norm-fw mdc-typography--subtitle1">{movie.genre}</h6>
        <p class="norm-fw mdc-typography--subtitle2">Rating: {movie.rating} / 5 Stars</p>
        <h6 class="norm-fw mdc-typography--headline6">Famous Quote: "{movie.slogan}"</h6>
        <h6 class="norm-fw spacing mdc-typography--headline6 text-left">{movie.desc}</h6>
    </div>
{/await}
</h1>