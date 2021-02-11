<script>
    import List, {Item, Text, PrimaryText, SecondaryText} from '@smui/list';
    import Textfield from '@smui/textfield';
    import Button, {Label} from '@smui/button';
    import movies from './_movies.js';
    let movs = [...movies]
    let filter = "";
    $: selectedMovie = movs.includes(selectedMovie) ? selectedMovie : movs[0];
    $: filtered = filter ? movs.filter(mov => {
        return mov.name.toLowerCase().includes(filter.toLowerCase())
    }) : movs;
    $: name = "";
    $: genre = "";
    $: desc = "";
    $: slogan = "";
    $: reset(selectedMovie);

    function reset(movie) {
        name = movie ? movie.name : "";
        genre = movie ? movie.genre : "";
        desc = movie ? movie.desc : "";
        slogan = movie ? movie.slogan : "";
    }

    function create() {
        let id;
        if (movs.length === 0) {
            id = 0;
        }
        else {
            id = movs[movs.length - 1].id + 1
        }
        movs = [...movs,
            {
                name: name,
                genre: genre,
                desc: desc,
                slogan: slogan,
                id: id
            }
        ]
        selectedMovie = movs[movs.length - 1];
    }

    function update() {
        let i;
        movs.forEach((mov, index) => {
            if (mov.id === selectedMovie.id) {
                i = index;
            }
        })
        movs[i] = {
            name: name,
            genre: genre,
            desc: desc,
            slogan: slogan,
            id: i
        }
        selectedMovie = movs[i]
    }

    function remove() {
        let i;
        movs.forEach((mov, index) => {
            if (mov.id === selectedMovie.id) {
                i = index;
            }
        })
        movs = [...movs.slice(0, i), ...movs.slice(i+1)];
        selectedMovie = movs[i-1]
    }
</script>

<style type="text/scss">
    @import "@material/typography/mdc-typography";
    .split {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .mt-20 {
        margin-top: 20px;
    }
    .m-10 {
        margin: 10px;
    }
</style>

<div class="split">
    <List twoLine singleSelection>
        {#if filtered}
            {#each filtered as movie}
                <Item on:SMUI:action={() => selectedMovie = movie} selected={selectedMovie === movie}>
                    <Text>
                        <PrimaryText>{movie.name}</PrimaryText>
                        <SecondaryText>{movie.genre}</SecondaryText>
                    </Text>
                </Item>
            {/each}
        {/if}
    </List>
    <div class="m-10">
        <div>
            <Textfield bind:value={filter} label="Filter" />
        </div>
        <Textfield bind:value={name} label="Name" />
        <Textfield bind:value={genre} label="Genre" />
        <Textfield bind:value={slogan} label="Slogan" />
        <div class="mt-20">
            <Textfield textarea fullwidth bind:value={desc} label="Description" />
        </div>
        <Button on:click={() => create()}><Label>Create</Label></Button>
        <Button on:click={() => update()}><Label>Update</Label></Button>
        <Button on:click={() => remove()}><Label>Delete</Label></Button>
    </div>
</div>