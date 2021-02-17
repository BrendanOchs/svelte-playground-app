<script>
    import Dialog, {Title, Content, Actions, InitialFocus} from '@smui/dialog';
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";


    let shoes = [{
        brand: "Goodliffe",
        color: "Maroon",
        material: "CLS-Class",
        size: 8
    }, {
        brand: "Malamore",
        color: "Green",
        material: "Corvette",
        size: 7
    }, {
        brand: "Tench",
        color: "Puce",
        material: "62",
        size: 10
    }, {
        brand: "Runnett",
        color: "Crimson",
        material: "Tempo",
        size: 7
    }, {
        brand: "Nafziger",
        color: "Orange",
        material: "300",
        size: 7
    }, {
        brand: "Culbert",
        color: "Red",
        material: "X5",
        size: 11
    }, {
        brand: "Hudleston",
        color: "Turquoise",
        material: "Prelude",
        size: 6
    }, {
        brand: "Escolme",
        color: "Goldenrod",
        material: "Mighty Max Macro",
        size: 7
    }, {
        brand: "Duffett",
        color: "Puce",
        material: "Jimmy",
        size: 8
    }, {
        brand: "Martyntsev",
        color: "Green",
        material: "Caravan",
        size: 8
    }, {
        brand: "Gibling",
        color: "Pink",
        material: "T100 Xtra",
        size: 10
    }, {
        brand: "Cunnah",
        color: "Khaki",
        material: "M3",
        size: 8
    }, {
        brand: "Olexa",
        color: "Yellow",
        material: "CR-V",
        size: 6
    }, {
        brand: "Orwin",
        color: "Indigo",
        material: "Ram 1500",
        size: 8
    }, {
        brand: "Shera",
        color: "Purple",
        material: "TSX",
        size: 6
    }]

    let showDesc = true;

    let simpleDialog;

    let selectedItem;

    function selectedShoe(shoe) {
        selectedItem = shoe;
        simpleDialog.open();  // To only open the selected item on the table
    }
</script>

<!-- <div class="flex-container table">
    <h2>HTML Table</h2>
    <table>
        <tr>
            <th>Brand</th>
            <th>Color</th>
            <th>Material</th>
            <th>Size</th>
        </tr>
        {#each shoes as shoe, i}
        <tr>
            <td>{shoes[i].brand}</td>
            <td>{shoes[i].color}</td>
            <td>{shoes[i].material}</td>
            <td>{shoes[i].size}</td>
        </tr>
        {/each}
    </table>
</div> -->

<style>
    /* .row-class:active {
        background-color: red;
    } */

    .showDesc {
        display: none;
    }

    p {
        margin-left: 5px;
    }

    /* .paragraph {
        width: 100px;
    } */
</style>

<DataTable table$aria-label="Shoes">
    <Head>
        <Row class="row-class">
            <Cell>Brand</Cell>
            <Cell>Color</Cell>
            <Cell>Material</Cell>
            <Cell>Size</Cell>
        </Row>
    </Head>
    <Body>
        {#each shoes as shoe}
            <Row id="{shoe}" on:click="{() => showDesc = !showDesc}">
                <Cell>{shoe.brand}</Cell>
                <Cell>{shoe.color}</Cell>
                <Cell>{shoe.material}</Cell>
                <Cell>{shoe.size}</Cell>
            </Row>
            <p on:click={() => selectedShoe(shoe)} class:showDesc={showDesc}>
            These are shoes from {shoe.brand}, they are {shoe.color}, made of {shoe.material}, avalible in sizes {shoe.size}</p>
        {/each}
    </Body>
</DataTable>

<Dialog bind:this={simpleDialog} aria-labelledby="simple-title" aria-describedby="simple-content">
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <Title id="simple-title">Title</Title>
    {#if selectedItem}
        <Content id="simple-content">
            These are shoes from {selectedItem.brand}, they are {selectedItem.color}, made of {selectedItem.material}, avalible in sizes {selectedItem.size}.
        </Content>
    {:else}
        <Content id="simple-content">
            The item you're looking for does not exist/SOld out  
        </Content>
    {/if}
</Dialog>
