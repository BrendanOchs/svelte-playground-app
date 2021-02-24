<script context="module">
    let id;
    var promise;
    export async function preload(page, session) {
        id = page.params.id
        promise = (async () => {
	    const res = await this.fetch(`offer/${id}.json`)
        return await res.json()
	})()
    }
</script>

<script>
    import IconButton from '@smui/icon-button';
</script>

<svelte:head>
    <title>Offer</title>
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
</svelte:head>

<style type="scss">
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
    .text-center {
        text-align: center;
    }
    img {
        width: 100%;
    }
    .split {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
</style>

<a href="offer"><IconButton class="material-icons">west</IconButton></a>
<h1>
{#await promise}
    <h4 class="text-center">Loading...</h4>
{:then car}
    <div class="text-center split">
        <img src={car.img} alt="{car.brand} {car.model}"/>
        <div>
            <h3 class="mdc-typography--headline3"><strong>{car.brand}</strong> {car.model}</h3>
            <p class="norm-fw mdc-typography--subtitle2">{car.year}</p>
            <h6 class="norm-fw mdc-typography--headline6">{car.color}</h6>
            <h2 class="norm-fw spacing mdc-typography--headline2">${car.price}</h2>
        </div>
    </div>
{/await}
</h1>