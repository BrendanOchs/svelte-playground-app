<script>
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

	let prefix = '';
	let dealName = '';
	let dealCompletion = '';
	let i = 0;

    $: filteredallDeals = prefix
	? allDeals.filter(person => {
		const name = `${person.dealCompletion}, ${person.dealName}`;
		return name.toLowerCase().startsWith(prefix.toLowerCase());
	})
	: allDeals;

	$: selected = filteredallDeals[i];

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
		// Remove selected person from the source array (allDeals), not the filtered array
		const index = allDeals.indexOf(selected);
		allDeals = [...allDeals.slice(0, index), ...allDeals.slice(index + 1)];

		dealName = dealCompletion = '';
		i = Math.min(i, filteredallDeals.length - 2);
	}

	function reset_inputs(person) {
		dealName = person ? person.dealName : '';
		dealCompletion = person ? person.dealCompletion : '';
	}
</script>

<input placeholder="filter prefix" bind:value={prefix}>

<select bind:value={i} size={5}>
	{#each filteredallDeals as person, i}
		<option value={i}>{person.dealCompletion}, {person.dealName}</option>
	{/each}
</select>

<label><input bind:value={dealName} placeholder="dealName"></label>
<label><input bind:value={dealCompletion} placeholder="dealCompletion"></label>

<div class='buttons'>
	<button on:click={create} disabled="{!dealName || !dealCompletion}">create</button>
	<button on:click={update} disabled="{!dealName || !dealCompletion || !selected}">update</button>
	<button on:click={remove} disabled="{!selected}">delete</button>
</div>
