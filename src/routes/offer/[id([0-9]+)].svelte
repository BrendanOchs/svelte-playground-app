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
</style>

<a href="inventory"><IconButton class="material-icons">west</IconButton></a>
<h1>
{#await promise}
    <h4 class="text-center">Loading...</h4>
{:then car}
    <div class="text-center">
        <img src={car.img} title="Car" alt="Car"/>
        <h3 class="mdc-typography--headline3"><strong>{car.brand}</strong> {car.model}</h3>
        <p class="norm-fw mdc-typography--subtitle2">{car.year}</p>
        <h6 class="norm-fw mdc-typography--headline6">{car.color}</h6>
        <h6 class="norm-fw spacing mdc-typography--headline6 text-left">${car.price}</h6>
    </div>
{/await}
</h1>