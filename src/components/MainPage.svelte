<section>
  <div>
    <DataTable table$aria-label="Shoes"></DataTable>
    <h2>Data Table</h2>
      <Head>
        <Row>
          <Cell><h3>Brand</h3></Cell>
          <Cell><h3>Color</h3></Cell>
          <Cell><h3>Material</h3></Cell>
        </Row>
      </Head>
      <Body>
          {#each shoes as shoe}
            <Row>
              <Cell>{shoe.brand}</Cell>
              <Cell><p>{shoe.color}</p></Cell>
              <Cell><p>{shoe.material}</p></Cell>
            </Row>
          {/each}
      </Body>
    </div>
</section>
  
  <script>
    import DataTable, {Head, Body, Row, Cell} from '@smui/data-table';

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