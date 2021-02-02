<div class="flex-container">
    {#each shoes as shoe}
    <div class="flex-item text-center">
        <h4>{shoe.brand}</h4>
        <p>{shoe.color}</p>
        <h6>"{shoe.material}"</h6>
        <button href="">See Details</button>
    </div>
    {/each}
  </div>
  
  <script>
      let shoes = [{
    "brand": "Goodliffe",
    "color": "Maroon",
    "material": "CLS-Class",
  }, {
    "brand": "Malamore",
    "color": "Green",
    "material": "Corvette",
  }, {
    "brand": "Tench",
    "color": "Puce",
    "material": "62",
  }, {
    "brand": "Runnett",
    "color": "Crimson",
    "material": "Tempo",
  }, {
    "brand": "Nafziger",
    "color": "Orange",
    "material": "300",
  }, {
    "brand": "Culbert",
    "color": "Red",
    "material": "X5",
  }, {
    "brand": "Hudleston",
    "color": "Turquoise",
    "material": "Prelude",
  }, {
    "brand": "Escolme",
    "color": "Goldenrod",
    "material": "Mighty Max Macro",
  }, {
    "brand": "Duffett",
    "color": "Puce",
    "material": "Jimmy",
  }, {
    "brand": "Martyntsev",
    "color": "Green",
    "material": "Caravan",
  }, {
    "brand": "Gibling",
    "color": "Pink",
    "material": "T100 Xtra",
  }, {
    "brand": "Cunnah",
    "color": "Khaki",
    "material": "M3",
  }, {
    "brand": "Olexa",
    "color": "Yellow",
    "material": "CR-V",
  }, {
    "brand": "Orwin",
    "color": "Indigo",
    "material": "Ram 1500",
  }]
  </script>