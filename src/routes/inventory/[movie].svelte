<script context="module">
    import List, {Item, Text, PrimaryText, SecondaryText} from '@smui/list';
    import { goto } from '@sapper/app';
    import movies from './_movies.js';
    var selectedIndex = 0;
    var extra;

    export async function preload(page, session) {
        let val = page.params.movie.split('_').join(' ');
        movies.forEach((mov) => {
            if (mov.name === val) {
                extra = mov;
                selectedIndex = mov.id;
            }
        })
    }
</script>

<script>
    var movie = extra;
    function editUrl (index) {
        let result = movies[index].name.split(" ").join('_');
        goto(`inventory/${result}`);
        movie = movies[index];
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
        {#each movies as movie}
            <Item on:SMUI:action={() => editUrl(movie.id)} selected={selectedIndex === movie.id}>
                <Text>
                    <PrimaryText>{movie.name}</PrimaryText>
                    <SecondaryText>{movie.genre}</SecondaryText>
                </Text>
            </Item>
        {/each}
    </List>
    <div>
        <div class="text-center">
            <h3 class="mdc-typography--headline3"><i>{movie.name}</i></h3>
                <p class="mdc-typography--subtitle1">{movie.genre}</p>
                <h6 class="mdc-typography--headline6">"{movie.slogan}"</h6>
                <p class="text-left spacing mdc-typography--body1">{movie.desc}</p>
            </div>
    </div>
</div>