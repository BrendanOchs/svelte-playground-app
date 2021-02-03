<div class="flex-container">
    {#each shoes as shoe}
    <div class="flex-item text-center">
        <h3>{shoe.brand}</h3>
        <p>{shoe.color}</p>
        <p>{shoe.material}</p>
        <button href="">See Details</button>
    </div>
    {/each}
  </div>
  
  <script>
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