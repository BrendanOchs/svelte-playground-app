<script>
  import Textfield from "@smui/textfield";
  import List, {Item, Text} from "@smui/list";
  import Button, {Label} from "@smui/button";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import ProgressBar from "./ProgressBar.svelte";
  import Modal from "./Modal.svelte"

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

  function detailView(){
    console.log("working")
  }
  function bColor(xpercent)
  {
    let r, g, b = 32;
    if (xpercent < 50){
        g = ((xpercent / 100) * 255);
        r = 255;
    }
    if (xpercent > 50){
        r = 255 - ((xpercent / 100) * 255);
        g = 255 - ((xpercent / 100) * 112);

    }
    if (xpercent == 50)
    {
        g = 255;
        r = 255;
    }
    return `rgb(${r}, ${g}, ${b})`;
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

<Textfield placeholder="filter prefix" bind:value={prefix}/>

<Textfield bind:value={name} placeholder="name"/>
<Textfield bind:value={percentDone} placeholder="percentDone"/>

<div class='buttons'>
	<Button on:click={create} disabled="{!name || !percentDone}">create</Button>
	<Button on:click={update} disabled="{!name || !percentDone || !selected}">update</Button>
	<Button on:click={remove} disabled="{!selected}">delete</Button>
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
<<<<<<< HEAD
        {#each allDeals as item}
          <Row>
              <Cell>{item.dealName}</Cell>
              <Cell><ProgressBar percent={item.dealCompletion} color={bColor(item.dealCompletion)}/></Cell>
              
=======
        {#each deals as item}
          <Row ondblclick = {()=> Modal.show()}>
              <Cell>{item.name}</Cell>
              <Cell><ProgressBar percent={item.percentDone}/></Cell>
>>>>>>> crud_alex
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
<<<<<<< HEAD
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
=======
</body>
>>>>>>> crud_alex
