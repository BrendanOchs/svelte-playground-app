<!--Layout-->
<section>
  <div class="flex-container">
    <div class="flex-item">1</div>
    <div class="flex-item center">2</div>
    <div class="flex-item">3</div>
  </div>
</section>
<!--End layout-->

<!--Data table-->
<section class="table">
  <div>
    <DataTable table$aria-label="Shoes"></DataTable>
    <h2>Data Table</h2>
      <Head>
        <Row>
          <Cell><h3>Brand</h3></Cell>
          <Cell><h3>Color</h3></Cell>
          <Cell><h3>Material</h3></Cell>
          <Cell><h3>Details</h3></Cell>
        </Row>
      </Head>
      <Body>
          {#each shoes as shoe}
            <Row id="{shoe}" on:click = {()=> modal.show()}>
              <Cell>{shoe.brand}</Cell>
              <Cell><p>{shoe.color}</p></Cell>
              <Cell><p>{shoe.material}</p></Cell>
              <Cell><Button on:click = {()=> selectedShoe(shoe)}>See Details</Button></Cell>
            </Row>
          {/each}
      </Body>
    </div>
</section>
<!--End data table-->

<!--Modal-->
<Modal bind:this={modal}>
  <h3>My Title</h3>
  <p>These shoes are from {selectedItem.brand}, are {selectedItem.color}, and are made of {selectedItem.material}.</p>
</Modal>
<!--End modal-->

<!--Crud-->
<section class="crud">
  <Textfield bind:value={searchedShoe} label="Filter"></Textfield>

  <List bind:value={i} size={5}>
    {#each filteredshoes as shoe, i}
    <Item on:SMUI:action={() => searchedShoe = shoe} selected = {searchedShoe === shoe}>
      <Text value={i}>{shoe.brand}, {shoe.color}, {shoe.material} </Text>
    </Item>
    {/each}
  </List>
  
  <Textfield bind:value={brand} label="Brand"></Textfield>
  <Textfield bind:value={color} label="Color"></Textfield>
  <Textfield bind:value={material} label="Material"></Textfield>
  
  <div class='buttons'>
    <Button on:click={create} disabled="{!brand || !color || !material}"><Label>Create</Label></Button>
    <Button on:click={update} disabled="{!brand || !color || !material || !selected}"><Label>Update</Label></Button>
    <Button on:click={remove} disabled="{!selected}"><Label>Delete</Label></Button>
  </div>
</section>
<!--End crud-->

<style>
  .crud {
    margin-left: 10px;
  }
  .table {
    margin-left: 10px;
  }
</style>

<script>
  import DataTable, {Head, Body, Row, Cell} from '@smui/data-table';
  import Button, {Label} from '@smui/button';
  import Textfield from '@smui/textfield';
  import List, {Item, Text} from '@smui/list';
  import Modal from "./Modal.svelte";
  let modal;

  let selectedItem = {
    "brand": "Nike",
    "color": "Red",
    "material": "Flyknit"
  }

  function selectedShoe(shoe) {
    selectedItem = shoe;
    modal.show();
  }

  let searchedShoe = "";
  let brand = "";
  let color = "";
  let material = "";
 
  let i = 0;
 
  $: filteredshoes = searchedShoe
    ? shoes.filter((shoe) => {
          const brandName = `${shoe.brand}`;
          return brandName.toLowerCase().startsWith(searchedShoe.toLowerCase());
      })
    : shoes;
 
  $: selected = filteredshoes[i];
 
  $: reset_inputs(selected);
 
  function create() {
    shoes = shoes.concat({ brand, color, material });
    i = shoes.length - 1;
    brand = color = material = "";
  }
 
  function update() {
    shoes[i] = { brand, color, material };
  }
 
  function remove() {
    shoes = [...shoes.slice(0, i), ...shoes.slice(i + 1)];
    brand = color = material = "";
  }
 
  function reset_inputs(shoe) {
    brand = shoe ? shoe.brand : "";
    color = shoe ? shoe.color : "";
    material = shoe ? shoe.material : "";
  }

  let shoes = [{
    "brand": "Nike",
    "color": "Red",
    "material": "Flyknit",
  }, {
    "brand": "Adidas",
    "color": "Green",
    "material": "Leather",
  }, {
    "brand": "Vans",
    "color": "Black",
    "material": "Synthetic Leather",
  }, {
    "brand": "Sperry",
    "color": "Brown",
    "material": "Cardboard",
  }, {
    "brand": "Under Armour",
    "color": "Orange",
    "material": "Synthetic Leather",
  }, {
    "brand": "UGG",
    "color": "White",
    "material": "Fur",
  }]
</script>