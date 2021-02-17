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

	let progression = '';
	let dealName = '';
	let dealCompletion = '';
	let i = 0;

  $: filteredAllDeals = progression
	? allDeals.filter(deal => {
		const name = `${deal.dealCompletion}, ${deal.dealName}`;
		return name.toLowerCase().startsWith(progression.toLowerCase());
	})
	: allDeals;

	$: selected = filteredAllDeals[i];

	$: reset_inputs(selected);
	function create() {
		allDeals = allDeals.concat({ dealName, dealCompletion });
		i = allDeals.length - 1;
		dealName = dealCompletion = '';
	}

	function update() {
		selected.dealName = dealName;
		selected.dealCompletion = dealCompletion;
		allDeals = allDeals;
	}

	function remove() {
		const index = allDeals.indexOf(selected);
		allDeals = [...allDeals.slice(0, index), ...allDeals.slice(index + 1)];

		dealName = dealCompletion = '';
		i = Math.min(i, filteredAllDeals.length - 2);
	}

	function reset_inputs(deal) {
		dealName = deal ? deal.dealName : '';
		dealCompletion = deal ? deal.dealCompletion : '';
	}
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
  <input placeholder="filter progression" bind:value={progression}>

  <select bind:value={i} size={5}>
  	{#each filteredAllDeals as deal, i}
  		<option value={i}>{deal.dealCompletion}, {deal.dealName}</option>
  	{/each}
  </select>

  <label><input bind:value={dealName} placeholder="Deal Name"></label>
  <label><input bind:value={dealCompletion} placeholder="Deal Completion"></label>

  <div class='buttons'>
  	<button on:click={create} disabled="{!dealName || !dealCompletion}">create</button>
  	<button on:click={update} disabled="{!dealName || !dealCompletion || !selected}">update</button>
  	<button on:click={remove} disabled="{!selected}">delete</button>
  </div>
</body>

<style>
</style>
