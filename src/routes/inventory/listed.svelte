<script>
    import List, {Item, Text, PrimaryText, SecondaryText} from '@smui/list';
    let selectedIndex = 0;
    var movie;
    import movies from './_movies.js';
    changeWindow(0);
    async function changeWindow(index) {
        selectedIndex = index;
        // if (process.browser) {
            movie = await getData(index).catch(err => console.log(err))
        // }
    }

    async function getData(index) {
        let res = await fetch(`inventory/${index+1}.json`);
        if (res.ok) {
            let response = await res.json();
            return response;
        }
        else {
            return res.error
        }
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
    <div class="resize">
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