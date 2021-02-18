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

	let prefix = '';
	let name = '';
	let percentDone = 0;
	let i = 0;

	$: filteredDeals = prefix
		? deals.filter(deals => {
			const name = `${deals.name}, ${deals.percentDone}`;
			return name.toLowerCase().startsWith(prefix.toLowerCase());
		})
		: deals;

	$: selected = filteredDeals[i];

	$: reset_inputs(selected);

	function create() {
		deals = deals.concat({ name, percentDone });
		i = deals.length - 1;
		name = percentDone = '';
	}

	function update() {
		deals[i] = { name, percentDone };
	}

	function remove() {
		deals = [...deals.slice(0, i), ...deals.slice(i + 1)];

		name = percentDone = '';
		i = Math.min(i, deals.length - 1);
	}

	function reset_inputs(deals) {
		name = deals ? deals.name : '';
		percentDone = deals ? deals.percentDone : '';
	}
</script>

<style>
	* {
		font-family: inherit;
		font-size: inherit;
	}

	input {
		display: block;
		margin: 0 0 0.5em 0;
	}

	select {
		float: left;
		margin: 0 1em 1em 0;
		width: 14em;
	}

	.buttons {
		clear: both;
	}
</style>

<input placeholder="filter prefix" bind:value={prefix}>

<label><input bind:value={name} placeholder="name"></label>
<label><input bind:value={percentDone} placeholder="percentDone"></label>

<div class='buttons'>
	<button on:click={create} disabled="{!name || !percentDone}">create</button>
	<button on:click={update} disabled="{!name || !percentDone || !selected}">update</button>
	<button on:click={remove} disabled="{!selected}">delete</button>
</div>

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