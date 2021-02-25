<script>
    import List, {Item, Text, PrimaryText, SecondaryText} from '@smui/list';
    import { stores, goto } from '@sapper/app';
    const { page } = stores();
    import movies from './_movies.js';

    let selectedIndex = 0;
    var movie;
    if ($page.query.movie) {
        let start = $page.query.movie.split('_').join(' ');
        let choice;
        movies.forEach((mov) => {
            if (mov.name === start) {
                choice = mov.id;
            }
        })
        changeWindow(choice)
    }
    else {
        changeWindow(0);
    }

    async function changeWindow(index) {
        selectedIndex = index;
        // if (process.browser) {
            movie = await getData(index).catch(err => console.log(err))
        // }
        editUrl(index);
    }

    async function getData(index) {
        let res = await fetch(`inventory/${index}.json`);
        if (res.ok) {
            let response = await res.json();
            return response;
        }
        else {
            return res.error
        }
    }

    function editUrl (index) {
        let result = movies[index].name.split(" ").join('_');
        goto(`inventory/listed?movie=${result}`);
    }
</script>

<style type="text/scss">
    @import "@material/typography/mdc-typography";
    .split {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .text-left {
        text-align: left;
    }
    .spacing {
        margin-left: auto;
        margin-right: auto;
        width: 90%;
    }
    /* .norm-fw {
        font-weight: 500;
    } */
</style>
<div class="split">
    <List twoLine singleSelection>
        {#each movies as movie, i}
            <Item on:SMUI:action={() => changeWindow(i)} selected={selectedIndex === i}>
                <Text>
                    <PrimaryText>{movie.name}</PrimaryText>
                    <SecondaryText>{movie.genre}</SecondaryText>
                </Text>
            </Item>
        {/each}
    </List>
    <div>
        {#if movie}
            <div class="text-center">
                <h3 class="mdc-typography--headline3"><i>{movie.name}</i></h3>
                <p class="mdc-typography--subtitle1">{movie.genre}</p>
                <h6 class="mdc-typography--headline6">"{movie.slogan}"</h6>
                <p class="text-left spacing mdc-typography--body1">{movie.desc}</p>
            </div>
        {/if}
    </div>
</div>