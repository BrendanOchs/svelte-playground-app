<script>
    import List, {Item, Text, PrimaryText, SecondaryText} from '@smui/list';
    import movies from './_movies.js';
    let selectedIndex = 0;
    var movie;
    changeWindow(0);
    async function changeWindow(index) {
        selectedIndex = index;
        if (process.browser) {
            movie = await getData(index).catch(err => console.log(err))
        }
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

<style>
    .split {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    h1 {
        font-size: 60px;
    }
    .text-left {
        text-align: left;
    }
    .spacing {
        margin-left: auto;
        margin-right: auto;
        width: 90%;
    }
    .norm-fw {
        font-weight: 500;
    }
    .resize h1 {
        font-size: 5vw;
    }
    .resize p {
        font-size: 2vw;
    }
    /* @media only screen and (min-width: 701px) and (max-width: 1200px) {
        .resize h1 {
            font-size: 45px;
        }
    }

    @media only screen and (max-width: 700px) {
        .resize h1 {
            font-size: 6vw;
        }
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
                <h1 class="norm-fw"><i>{movie.name}</i></h1>
                <p>{movie.genre}</p>
                <h2 class="norm-fw">"{movie.slogan}"</h2>
                <h3 class="text-left spacing norm-fw">{movie.desc}</h3>
            </div>
        {/if}
    </div>
</div>