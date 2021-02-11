<script>
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import ProgressBar from "./ProgressBar.svelte";

  let allDeals = [
    {
      dealName: "Jaamie",
      dealCompletion: 13,
    },
    {
      dealName: "Mars",
      dealCompletion: 88,
    },
    {
      dealName: "Dal",
      dealCompletion: 65,
    },
    {
      dealName: "Robbie",
      dealCompletion: 32,
    },
    {
      dealName: "Anette",
      dealCompletion: 50,
    },
  ];
</script>

<body>
  <div class="flex-container">
    <DataTable table$aria-label="ObjectTable">
      <Head>
        <Row>
          {#each Object.keys(allDeals[0]) as heading}
            <Cell>{heading}</Cell>
          {/each}
        </Row>
      </Head>
      <Body>
        {#each allDeals as item}
          <Row>
              <Cell>{item.dealName}</Cell>
              <Cell><ProgressBar percent={item.dealCompletion}/></Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
</body>

<style>
</style>
