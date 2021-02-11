<script>
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import ProgressBar from "./ProgressBar.svelte";

  let deals = [
    {
      name: "Jaamie",
      percentDone: 13,
    },
    {
      name: "Mars",
      percentDone: 88,
    },
    {
      name: "Dal",
      percentDone: 65,
    },
    {
      name: "Robbie",
      percentDone: 32,
    },
    {
      name: "Anette",
      percentDone: 50,
    },
  ];
</script>

<body>
  <div class="flex-container">
    <DataTable table$aria-label="ObjectTable">
      <Head>
        <Row>
          {#each Object.keys(deals[0]) as heading}
            <Cell>{heading}</Cell>
          {/each}
        </Row>
      </Head>
      <Body>
        {#each deals as item}
          <Row>
              <Cell>{item.name}</Cell>
              <Cell><ProgressBar percent={item.percentDone}/></Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
</body>

<style>
</style>
