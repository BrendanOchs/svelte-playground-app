<script>
    import Card, {Content, Actions, ActionButtons, ActionIcons} from '@smui/card';
    import MatDialog from '../../components/MatDialog.svelte'
    import Button from '@smui/button';
    import Textfield from '@smui/textfield';
    import IconButton, {Icon} from '@smui/icon-button';
    import movies from './_movies.js';
    let movs = [...movies];
    let filter = "";
    $: filtered = filter ? movs.filter(mov => {
        return mov.name.toLowerCase().includes(filter.toLowerCase())
    }) : movs;

    let dialog;
    let dialogData;

    function dialogOpen(movie, reason) {
        let data = {};
        if (reason == "delete") {
            data.title = "Delete " + movie.name;
            data.content = "Are you sure you want to delete " + movie.name + "?";
            data.actions = ["Cancel", "Delete"];
        }
        else if (reason == "edit") {
            data.actions = ["Cancel", "Save"];
            data.title = "Edit Movie";
        }
        else {
            data.actions = ["Cancel", "Create"];
            data.title = "Create Movie";
        }
        data.movie = movie;
        data.reason = reason;
        dialogData = data;
        dialog.open();
    }

    function create(event) {
        let movie = event.detail;
        let id;
        if (movs.length === 0) {
            id = 0;
        }
        else {
            id = movs[movs.length - 1].id + 1
        }
        movie.id = id;
        movs = [...movs,
            movie
        ];
    }

    function update(event) {
        let movie = event.detail;
        let i;
        movs.forEach((mov, index) => {
            if (mov.id === movie.id) {
                i = index;
            }
        })
        movs[i] = movie;
    }

    function remove(movie) {
        let i = movs.indexOf(movie);
        movs = [...movs.slice(0, i), ...movs.slice(i+1)];
    }
</script>

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
</style>

<div class="m-10">
    <Textfield bind:value={filter} label="Filter" />
    <div style="float: right" class="m-10"><Button on:click={() => dialogOpen(movies[0],"create")}>Create<span class="pl-5"><Icon class="material-icons">add</Icon></span></Button></div>
</div>

<div class="flex-container">
    {#if filtered}
        {#each filtered as movie}
            <div class="flex-item text-center">
                <div class="mdc-elevation--z5">
                    <Card>
                        <Actions>
                            <ActionButtons>
                                <Button title="Edit" on:click={() => dialogOpen(movie, "edit")}>Edit</Button>
                            </ActionButtons>
                            <ActionIcons>
                                <IconButton class="material-icons" title="Delete" on:click={() => dialogOpen(movie, "delete")}>delete</IconButton>
                            </ActionIcons>
                        </Actions>
                        <Content>
                            <h4 class="mdc-typography--headline4">{movie.name}</h4>
                            <p class="mdc-typography--subtitle1">{movie.genre}</p>
                            <h6 class="mdc-typography--headline6">{movie.rating} / 5</h6>
                            <a href="inventory/{movie.id}"><Button>See Details</Button></a>
                        </Content>
                    </Card>
                </div>
            </div>
        {/each}
    {/if}
    <div class="flex-item"></div>
</div>

<MatDialog bind:this={dialog} data={dialogData} on:delete={() => remove(dialogData.movie)} on:save={update} on:create={create}/>