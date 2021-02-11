<script>
    let tableItems = [{
  "First Name": "Eugenie",
  "Last Name": "Hymor"
}, {
  "First Name": "Joanie",
  "Last Name": "Airdrie"
}, {
  "First Name": "Maris",
  "Last Name": "Paik"
}, {
  "First Name": "Regan",
  "Last Name": "Buckbee"
}, {
  "First Name": "Anette",
  "Last Name": "Melesk"
}]
</script>
<style>
table, th, td {
    border: 1px solid;
    border-collapse: collapse;
    width:50%;
    margin-left: 25%;
    margin-right:25%;
    margin-top: 50px;
    padding:10px;
}
tbody tr:nth-child(even){
    background-color: #cfcfcf;
}
tbody tr:nth-child(odd){
    background-color: #dfdfdf;
}
</style>

<body>
    <table>
      <thead>
        <tr>
            {#each Object.keys(tableItems[0]) as columnHeading}
          <th>{columnHeading}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
          {#each Object.values(tableItems) as row}
        <tr>
            {#each Object.values(row) as cell}
          <td>{cell}</td>
          {/each}
        </tr>
        {/each}
      </tbody>
    </table>
  </body>   