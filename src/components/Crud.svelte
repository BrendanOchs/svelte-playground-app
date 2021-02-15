<script>
    import List, {Item, Text} from '@smui/list';

    let clicked = 0;

    import shoes from './MainPage.svelte';

    let searchedShoe = "";
    let brand = "";
    let color = "";
    let material = "";

    let i = 0;

    $: filteredShoes = searchedShoe
        ? shoes.filter((shoe) => {
              const brandName = `${shoe.brand}`;
              return brandName.toLowerCase().startsWith(searchedShoe.toLowerCase());
          })
        : shoes;

    $: selected = filteredShoes[i];

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
</script>

<input placeholder="filter prefix" bind:value={searchedShoe}>

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
    
  .container {
    outline: 1px solid black;
    display: inline-flex;
    align-items: center;
    background-color: gray;
  }
</style>

<div class="container">
        {#each shoes as shoe}
          <Item on:click={() => clicked++}>
            <Text>{shoe.brand}, {shoe.color}, {shoe.material}</Text>
          </Item>
        {/each}
</div>

<select bind:value={i} size={5}>
	{#each filteredShoes as shoe, i}
		<option value={i}>{shoe.brand}, {shoe.color}, {shoe.material} </option>
	{/each}
</select>

<label><input bind:value={brand} placeholder="brand"></label>
<label><input bind:value={color} placeholder="color"></label>
<label><input bind:value={material} placeholder="material"></label>

<div class='buttons'>
	<button on:click={create} disabled="{!brand || !color || !material}">create</button>
	<button on:click={update} disabled="{!brand || !color || !material || !selected}">update</button>
	<button on:click={remove} disabled="{!selected}">delete</button>
</div>