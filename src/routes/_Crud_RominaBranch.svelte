<script>
     import Drawer, {AppContent, Content, Header, Title, Subtitle, Scrim} from '@smui/drawer';
     import Chip, {Set} from '@smui/chips';

    // import Card from '@smui/card';
    import Button, {Label} from '@smui/button';
    import List, {Item, Text} from '@smui/list';
    import Textfield, {Input, Textarea} from '@smui/textfield';
    import Icon from '@smui/textfield/icon/index';

    import Dialog from '@smui/dialog';
    import DataTable, {Head, Body, Row, Cell } from "@smui/data-table";

    let shoes = [
        {
            brand: "Goodliffe",
            color: "Maroon",
            material: "CLS-Class",
            size: 8,
        },
        {
            brand: "Malamore",
            color: "Green",
            material: "Corvette",
            size: 7,
        },
        {
            brand: "Tench",
            color: "Puce",
            material: "62",
            size: 10,
        },
        {
            brand: "Runnett",
            color: "Crimson",
            material: "Tempo",
            size: 7,
        },
        {
            brand: "Nafziger",
            color: "Orange",
            material: "300",
            size: 7,
        },
        {
            brand: "Culbert",
            color: "Red",
            material: "X5",
            size: 11,
        },
        {
            brand: "Hudleston",
            color: "Turquoise",
            material: "Prelude",
            size: 6,
        },
        {
            brand: "Escolme",
            color: "Goldenrod",
            material: "Mighty Max Macro",
            size: 7,
        },
        {
            brand: "Duffett",
            color: "Puce",
            material: "Jimmy",
            size: 8,
        },
        {
            brand: "Martyntsev",
            color: "Green",
            material: "Caravan",
            size: 8,
        },
        {
            brand: "Gibling",
            color: "Pink",
            material: "T100 Xtra",
            size: 10,
        },
        {
            brand: "Cunnah",
            color: "Khaki",
            material: "M3",
            size: 8,
        },
        {
            brand: "Olexa",
            color: "Yellow",
            material: "CR-V",
            size: 6,
        },
        {
            brand: "Orwin",
            color: "Indigo",
            material: "Ram 1500",
            size: 8,
        },
        {
            brand: "Shera",
            color: "Purple",
            material: "TSX",
            size: 6,
        },
    ];

    let choice = "Brand";

    // let searchByBrand = true;
    // let searchByColor = false;
    // let searchByMaterial = false;
    // let searchBySize = false;

    let searchedShoe = "";
    let brand = "";
    let color = "";
    let material = "";
    let size = 0;

    let i = 0;

    $: filteredShoes = searchedShoe
        ? shoes.filter((shoe) => {
              if (choice == "Brand") {
                const brandName = `${shoe.brand}`;
                return brandName.toLowerCase().startsWith(searchedShoe.toLowerCase());
              } else if (choice == "Color") {
                const colorName = `${shoe.color}`;
                return colorName.toLowerCase().startsWith(searchedShoe.toLowerCase());
              } else if (choice == "Material") {
                  const materialName = `${shoe.material}`;
                  return materialName.toLowerCase().startsWith(searchedShoe.toLowerCase());
              } else {
                  const sizeNumber = `${shoe.size}`;
                  return sizeNumber.startsWith(searchedShoe);
              }
          })
        : shoes;

    $: selected = filteredShoes[i];

    $: reset_inputs(selected);

    function create() {
        shoes = shoes.concat({ brand, color, material, size });
        i = shoes.length - 1;
        brand = color = material = "";
        size = 0;
    }

    function update() {
        shoes[i] = { brand, color, material, size };
    }

    function remove() {
        shoes = [...shoes.slice(0, i), ...shoes.slice(i + 1)];

        brand = color = material = "";
        size = 0;
        i = Math.min(i, shoes.length - 1);
    }

    function reset_inputs(shoe) {
        brand = shoe ? shoe.brand : "";
        color = shoe ? shoe.color : "";
        material = shoe ? shoe.material : "";
        size = shoe ? shoe.size : 0;
    }

    // Toggle Drawer Code

    let myDrawer;
    let myDrawerOpen = false;

    let simpleDialog;

    let selectedItem;

    function selectedRow(shoe) {
        selectedItem = shoe;
        simpleDialog.open();  // To only open the selected item on the table
    }

</script>

<!-- No SMUI -->

<!-- <div class="search buttons"></div>

<input placeholder="Search by Brand" bind:value={searchedShoe}>

<select bind:value={i} size={6}>
	{#each filteredShoes as shoe, i}
		<option value={i}>{shoe.brand}, {shoe.color}, {shoe.material}, {shoe.size}</option>
	{/each}
</select>

<label><input bind:value={brand} placeholder="brand"></label>
<label><input bind:value={color} placeholder="color"></label>
<label><input bind:value={material} placeholder="material"></label>
<label><input bind:value={size} placeholder="size"></label>

<div class='buttons'>
	<button on:click={create} disabled="{!brand || !color || !size || !material}">Add</button>
	<button on:click={update} disabled="{!brand || !color || !size || !material || !selected}">Update</button>
	<button on:click={remove} disabled="{!selected}">Remove</button>
</div>  -->


<style>
    
    .drawer-container {
    position: relative;
    display: flex;
    height: 550px;
    border: 1px solid rgba(0,0,0,.1);
    overflow: hidden;
    z-index: 0;
  }

  .drawer-container.small-screen {
      display: none;
  }

  .search {
      margin: 5px;
  }

  .main-content {
    overflow: auto;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
  }

  @media only screen and (max-width: 600px) {
    .drawer-container.small-screen {
        display: flex;
    }

    .drawer-container.large-screen {
        display: none;
    }
  }

</style>

<!-- SMUI
<div class="crud-blick">
    <input placeholder="Search by Brand" bind:value={searchedShoe}>

    <div class="card-container">
        <div>
            <Card style="width: 320px;">
                <Content component={List}>
                {#each filteredShoes as shoe, i}
                    <Item value={i}>{shoe.brand}, {shoe.color}, {shoe.material}, {shoe.size}</Item>
                {/each}
                </Content>
            </Card>
        </div>
    </div>

    <Textfield variant="filled" bind:value={brand} label="Brand" input$aria-controls="helper-text-filled-a" input$aria-describedby="helper-text-filled-a"/>
    <Textfield variant="filled" bind:value={color} label="color" input$aria-controls="helper-text-filled-a" input$aria-describedby="helper-text-filled-a"/>
    <Textfield variant="filled" bind:value={material} label="material" input$aria-controls="helper-text-filled-a" input$aria-describedby="helper-text-filled-a"/>
    <Textfield variant="filled" bind:value={size} label="size" input$aria-controls="helper-text-filled-a" input$aria-describedby="helper-text-filled-a"/>

    <div class='buttons'>
        <Button on:click={create} disabled="{!brand || !color || !size}">Add</Button>
        <Button on:click={update} disabled="{!brand || !color || !size || !selected}">Update</Button>
        <Button on:click={remove} disabled="{!selected}">Remove</Button>
    </div>
</div>
SMUI Drawer -->

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
            <Row id="{shoe}" on:click={() => selectedRow(shoe)}>
                <Cell>{shoe.brand}</Cell>
                <Cell>{shoe.color}</Cell>
                <Cell>{shoe.material}</Cell>
                <Cell>{shoe.size}</Cell>
            </Row>
            <!-- <p on:click={() => selectedShoe(shoe)} class:showDesc={showDesc}>
            These are shoes from {shoe.brand}, they are {shoe.color}, made of {shoe.material}, avalible in sizes {shoe.size}</p> -->
        {/each}
    </Body>
</DataTable>

<Dialog bind:this={simpleDialog} aria-labelledby="simple-title" aria-describedby="simple-content">
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
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

<!-- Drawer for Desktop (non-toggle) -->

<div class="drawer-container large-screen">
    <Drawer>
        <Content>
            <div class="search">
                <Textfield withLeadingIcon bind:value={searchedShoe} label="Search by {choice}">
                    <Icon class="material-icons">search</Icon>
                </Textfield>
            </div>
            <div>
                <Set chips={['Brand', 'Color', 'Material', 'Size']} let:chip choice bind:selected={choice}>
                    <Chip>{chip}</Chip>
                </Set>
              </div>
            <List>
                {#each filteredShoes as shoe, index}
                    <Item on:SMUI:action={() => i = index}>{shoe.brand}, {shoe.color}, {shoe.material}, {shoe.size}</Item>
                {/each}
            </List>
        </Content>
    </Drawer>
    <AppContent class="app-content">
        <main class="main-content">
            <Textfield variant="filled" bind:value={brand} label="Brand"/>
            <Textfield variant="filled" bind:value={color} label="Color"/>
            <Textfield variant="filled" bind:value={material} label="Material"/>
            <Textfield variant="filled" bind:value={size} label="Size"/>
            <div class='buttons'>
                <Button on:click={create} disabled="{!brand || !color || !material || !size}">Add</Button>
                <Button on:click={update} disabled="{!brand || !color || !material || !size || !selected}">Update</Button>
                <Button on:click={remove} disabled="{!selected}">Remove</Button>
            </div>
        </main>
    </AppContent>
</div>

<!-- Drawer for Mobile Screens (toggle) -->

<div class="drawer-container small-screen">
    <Drawer variant="dismissible" bind:this={myDrawer} bind:open={myDrawerOpen}>
        <Content>
            <div class="search">
                <Textfield withLeadingIcon bind:value={searchedShoe} label="Search by {choice}">
                    <Icon class="material-icons">search</Icon>
                </Textfield>
            </div>
            <div>
                <Set chips={['Brand', 'Color', 'Material', 'Size']} let:chip choice bind:selected={choice}>
                    <Chip>{chip}</Chip>
                </Set>
              </div>
          <List>
              {#each filteredShoes as shoe, index}
                  <Item on:SMUI:action={() => i = index}>{shoe.brand}, {shoe.color}, {shoe.material}, {shoe.size}</Item>
              {/each}
          </List>
        </Content>
      </Drawer>
      <AppContent class="app-content">
          <main class="main-content">
            <div class="search-button">
                <Button on:click={() => myDrawerOpen = !myDrawerOpen}>Search</Button>
            </div>
            <Textfield variant="filled" bind:value={brand} label="Brand"/>
            <Textfield variant="filled" bind:value={color} label="Color"/>
            <Textfield variant="filled" bind:value={material} label="Material"/>
            <Textfield variant="filled" bind:value={size} label="Size"/>
            <div class='buttons'>
                <Button on:click={create} disabled="{!brand || !color || !material || !size}">Add</Button>
                <Button on:click={update} disabled="{!brand || !color || !material || !size || !selected}">Update</Button>
                <Button on:click={remove} disabled="{!selected}">Remove</Button>
            </div>
          </main>
      </AppContent>
  </div>