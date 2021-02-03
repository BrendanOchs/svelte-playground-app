<script>
  import DataTable, {Head, Body, Row, Cell} from "@smui/data-table";

    let tableItems = [{
  "First Name": "Eugenie",
  "Last Name": "Hymor"
}, {
  "First Name": "Joanie",
  "Last Name": "Airdrie"
}, {
  "First Name": "Maris",
  "Last Name": "Paik"
}, {
  "First Name": "Regan",
  "Last Name": "Buckbee"
}, {
  "First Name": "Anette",
  "Last Name": "Melesk"
}]
</script>

<style>
</style>

<body>
  <div class = "flex-container">
    <DataTable table$aria-label="ObjectTable">
      <Head>
        <Row>
            {#each Object.keys(tableItems[0]) as heading}
          <Cell>{heading}</Cell>
          {/each}
          </Row>
        </Head>
      <Body>
          {#each Object.values(tableItems) as row}
        <Row>
            {#each Object.values(row) as cell}
          <Cell>{cell}</Cell>
          {/each}
        </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
</body>   