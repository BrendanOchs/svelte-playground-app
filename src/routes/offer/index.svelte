<script>
    import Card, {Content, Actions, ActionButtons, ActionIcons} from '@smui/card';
    import OffersDialog from '../../components/OffersDialog.svelte'
    import Button from '@smui/button';
    import Textfield from '@smui/textfield';
    import IconButton, {Icon} from '@smui/icon-button';
    // import cars from './_cars.js';
    // import { all } from './[id([0-9]+)].json';
    let carList;
    getAll();
    let filter = "";
    $: filtered = filter ? carList.filter(car => {
        return car.brand.toLowerCase().includes(filter.toLowerCase())
    }) : carList;

    let dialog;
    let dialogData;

    function dialogOpen(car, reason) {
        let data = {};
        if (reason == "delete") {
            data.title = "Delete Offer";
            data.content = "Are you sure you want to delete this offer?";
            data.actions = ["Cancel", "Delete"];
        }
        else if (reason == "edit") {
            data.actions = ["Cancel", "Save"];
            data.title = "Edit Offer";
        }
        else {
            data.actions = ["Cancel", "Create"];
            data.title = "Create Offer";
        }
        if (car) {
            data.car = car;
        }
        else {
            data.car = {
                brand: "Brand",
                model: "Model",
                year: 2000,
                price: 0,
                color: "Color",
                img: "https://www.motortrend.com/uploads/sites/5/2002/10/112_0102_first_drive_2001_toyota_highlander-2001_toyota_highlander-front_side_view.jpg?fit=around%7C875:492"
            }
        }
        data.reason = reason;
        dialogData = data;
        dialog.open();
    }

    function create(event) {
        let car = event.detail;
        let id;
        if (carList.length === 0) {
            id = 0;
        }
        else {
            id = carList[carList.length - 1].id + 1
        }
        car.id = id;
        carList = [...carList,
            car
        ];
        let url = `offer/${car.id}.json`;
        let res = (async () => {
            let val = await fetch(url, { method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(car)});
            return val;
        })()
    }

    function update(event) {
        let car = event.detail;
        let i;
        carList.forEach((c, index) => {
            if (c.id === car.id) {
                i = index;
            }
        })
        carList[i] = car;
        let url = `offer/${car.id}.json`;
        let res = (async () => {
            let val = await fetch(url, { method: "PUT", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(car)});
            return val;
        })()
    }

    function remove(car) {
        let i = carList.indexOf(car);
        carList = [...carList.slice(0, i), ...carList.slice(i+1)];
        let url = `offer/${car.id}.json`;
        let res = (async () => {
            let val = await fetch(url, { method: "DELETE", headers: {'Content-Type': 'application/json'}});
            return val;
        })()
    }

    async function getAll() {
        if (process.browser) {
            let res = await fetch(`offer/-1.json`);
            let body = await res.json();
            carList = body.val;
            return res;
        }
    }
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

<style type="text/scss">
    @import "@material/elevation/mdc-elevation";
    @import "@material/typography/mdc-typography";
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
    a {
        text-decoration: none;
    }
    .m-10 {
        margin: 10px;
    }
    .pl-5 {
        padding-left: 5px;
    }
    .flex-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 0;
  margin: 0;
}

.flex-item {
  padding: 5px;
  margin: 5px;
  height: auto;
  margin-top: 10px;
  color: #000000;
  /* min-width: 300px; */
  /* font-size: 3em; */
  text-align: center;
  flex: 1 1 0;
  order: 2;
}

.prominent {
  flex-grow: 2;
}

.text-center {
  text-align: center;
}

@media only screen and (max-width: 1200px) {
  .flex-item {
    width: 100%;
    min-width: 95%;
  }

  .prominent {
    order: 1;
  }
}

@media only screen and (min-width: 1201px) {
  .flex-item {
    width: 50%;
    min-width: 45%;
  }

  .prominent {
    order: 1;
  }
}
</style>

<div class="m-10">
    <Textfield bind:value={filter} label="Filter" />
    <div style="float: right" class="m-10"><Button on:click={() => dialogOpen(null, "create")}>Create<span class="pl-5"><Icon class="material-icons">add</Icon></span></Button></div>
</div>

<div class="flex-container">
    {#if filtered}
        {#each filtered as car}
            <div class="flex-item text-center">
                <div class="mdc-elevation--z5">
                    <Card>
                        <Actions>
                            <ActionButtons>
                                <Button title="Edit" on:click={() => dialogOpen(car, "edit")}>Edit</Button>
                            </ActionButtons>
                            <ActionIcons>
                                <IconButton class="material-icons" title="Delete" on:click={() => dialogOpen(car, "delete")}>delete</IconButton>
                            </ActionIcons>
                        </Actions>
                        <Content>
                            <h4 class="mdc-typography--headline4">{car.brand} {car.model}</h4>
                            <p class="mdc-typography--subtitle1">{car.year}</p>
                            <h6 class="mdc-typography--headline6">{car.color}</h6>
                            <a href="offer/{car.id}"><Button>See Details</Button></a>
                        </Content>
                    </Card>
                </div>
            </div>
        {/each}
    {/if}
    <div class="flex-item"></div>
</div>

<OffersDialog bind:this={dialog} data={dialogData} on:delete={() => remove(dialogData.car)} on:save={update} on:create={create}/>