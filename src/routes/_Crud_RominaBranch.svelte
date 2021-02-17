<script>
    import Card, {Content} from '@smui/card';
    import Button, {Label} from '@smui/button';
    import List, {Item, Text} from '@smui/list';

    let clicked = 0;

    let shoes = [
        {
            brand: "Goodliffe",
            color: "Maroon",
            material: "CLS-Class",
            size: 8,
        },
        {
            brand: "Malamore",
            color: "Green",
            material: "Corvette",
            size: 7,
        },
        {
            brand: "Tench",
            color: "Puce",
            material: "62",
            size: 10,
        },
        {
            brand: "Runnett",
            color: "Crimson",
            material: "Tempo",
            size: 7,
        },
        {
            brand: "Nafziger",
            color: "Orange",
            material: "300",
            size: 7,
        },
        {
            brand: "Culbert",
            color: "Red",
            material: "X5",
            size: 11,
        },
        {
            brand: "Hudleston",
            color: "Turquoise",
            material: "Prelude",
            size: 6,
        },
        {
            brand: "Escolme",
            color: "Goldenrod",
            material: "Mighty Max Macro",
            size: 7,
        },
        {
            brand: "Duffett",
            color: "Puce",
            material: "Jimmy",
            size: 8,
        },
        {
            brand: "Martyntsev",
            color: "Green",
            material: "Caravan",
            size: 8,
        },
        {
            brand: "Gibling",
            color: "Pink",
            material: "T100 Xtra",
            size: 10,
        },
        {
            brand: "Cunnah",
            color: "Khaki",
            material: "M3",
            size: 8,
        },
        {
            brand: "Olexa",
            color: "Yellow",
            material: "CR-V",
            size: 6,
        },
        {
            brand: "Orwin",
            color: "Indigo",
            material: "Ram 1500",
            size: 8,
        },
        {
            brand: "Shera",
            color: "Purple",
            material: "TSX",
            size: 6,
        },
    ];

    let searchedShoe = "";
    let brand = "";
    let color = "";
    let material = "";
    let size = 0;

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
        shoes = shoes.concat({ brand, color, material, size });
        i = shoes.length - 1;
        brand = color = material = "";
        size = 0;
    }

    function update() {
        shoes[i] = { brand, color, material, size };
    }

    function remove() {
        shoes = [...shoes.slice(0, i), ...shoes.slice(i + 1)];

        brand = color = material = "";
        size = 0;
        i = Math.min(i, shoes.length - 1);
    }

    function reset_inputs(shoe) {
        brand = shoe ? shoe.brand : "";
        color = shoe ? shoe.color : "";
        material = shoe ? shoe.material : "";
        size = shoe ? shoe.size : 0;
    }
</script>

<!-- No SMUI -->

<div class="search buttons"></div>

<input placeholder="Search by Brand" bind:value={searchedShoe}>

<select bind:value={i} size={6}>
	{#each filteredShoes as shoe, i}
		<option value={i}>{shoe.brand}, {shoe.color}, {shoe.material}, {shoe.size}</option>
	{/each}
</select>

<label><input bind:value={brand} placeholder="brand"></label>
<label><input bind:value={color} placeholder="color"></label>
<label><input bind:value={material} placeholder="material"></label>
<label><input bind:value={size} placeholder="size"></label>

<div class='buttons'>
	<button on:click={create} disabled="{!brand || !color || !size || !material}">Add</button>
	<button on:click={update} disabled="{!brand || !color || !size || !material || !selected}">Update</button>
	<button on:click={remove} disabled="{!selected}">Remove</button>
</div> 


<!-- <style>
    .card-container {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      min-height: 500px;
      min-width: 380px;
      background-color: #f8f8f8;
      margin-right: 20px;
      margin-bottom: 20px;
    }
</style> -->

<!-- SMUI -->
<div class="">
<input placeholder="Search by Brand" bind:value={searchedShoe}>

<div class="card-container">
    <div>
      <Card style="width: 320px;">
        <Content component={List}>
          {#each shoes as shoe}
            <Item on:click={() => clicked++}>
              <Text>{shoe.brand}, {shoe.color}, {shoe.material}, {shoe.size}</Text>
            </Item>
          {/each}
        </Content>
      </Card>
    </div>
  </div>

<select bind:value={i} size={5}>
	{#each filteredShoes as shoe, i}
		<option value={i}>{shoe.brand}, {shoe.color}</option>
	{/each}
</select>

<label><input bind:value={brand} placeholder="brand"></label>
<label><input bind:value={color} placeholder="color"></label>
<label><input bind:value={size} placeholder="size"></label>

<div class='buttons'>
	<Button on:click={create} disabled="{!brand || !color || !size}">Add</Button>
	<Button on:click={update} disabled="{!brand || !color || !size || !selected}">Update</Button>
	<Button on:click={remove} disabled="{!selected}">Remove</Button>
</div>
</div>