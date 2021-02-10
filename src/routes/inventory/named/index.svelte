<script>
    import List, {Item, Text, PrimaryText, SecondaryText} from '@smui/list';
    import { stores, goto } from '@sapper/app';
    const { page } = stores();
    import movies from '../_movies.js';

    let selectedIndex = 0;

    async function changeWindow(index) {
        selectedIndex = index;
        editUrl(index);
    }

    function editUrl (index) {
        let result = movies[index].name.split(" ").join('_');
        goto(`inventory/named/${result}`);
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
<div>
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
</div>