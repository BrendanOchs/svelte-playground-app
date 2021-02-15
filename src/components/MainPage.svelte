<section>
  <div class="flex-container">
    <div class="flex-item">1</div>
    <div class="flex-item center">2</div>
    <div class="flex-item">3</div>
  </div>
</section>

<section>
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
              <Cell><button on:click = {()=> selectedShoe(shoe)}>See Details</button></Cell>
            </Row>
          {/each}
      </Body>
    </div>
</section>

<Modal bind:this={modal}>
  <h3>My Title</h3>
  <p>These shoes are from {selectedItem.brand}, are {selectedItem.color}, and are made of {selectedItem.material}.</p>
</Modal>

<script>
  import DataTable, {Head, Body, Row, Cell} from '@smui/data-table';
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