<script>
    import Textfield from "@smui/textfield";
    import List, {Item, Text} from "@smui/list";
    import Button, {Label} from "@smui/button";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import ProgressBar from "./ProgressBar.svelte";
    import Modal from "./Modal.svelte"
import { bind } from "svelte/internal";
  
    let deals = [
      {
        firstName: "Jon",
        lastName: "Doe",
        email: "exampleEmail@emails.com",
        phoneNum: "(555)555-5555",
        homeAddress: "10001 Street ave"
      },
    ];
  
    let prefix = '';
    let firstName = '';
    let lastName = '';
    let email = '';
    let phoneNum = '';
    let homeAddress = '';
    let i = 0;	
    
    $: filteredDeals = prefix
          ? deals.filter(deals => {
              const name = `${deals.firstName}, ${deals.lastName}, ${deals.email}, ${deals.phoneNum}, ${deals.homeAddress}`;
              return name.toLowerCase().startsWith(prefix.toLowerCase());
          })
          : deals;
  
      $: selected = filteredDeals[i];
  
      $: reset_inputs(selected);
  
      function create() {
          deals = deals.concat({ firstName, lastName, email, phoneNum, homeAddress });
          i = deals.length - 1;
          firstName = lastName = email = phoneNum = homeAddress = '';
      }
  
      function update() {
          deals[i] = { firstName, lastName, email, phoneNum, homeAddress};
      }
  
      function remove() {
          deals = [...deals.slice(0, i), ...deals.slice(i + 1)];
  
          firstName = lastName = email = phoneNum = homeAddress = '';
          i = Math.min(i, deals.length - 1);
      }
  
      function reset_inputs(deals) {
        firstName = deals ? deals.firstName : '';
        lastName = deals ? deals.lastName : '';
        email = deals ? deals.email : '';
        phoneNum = deals ? deals.phoneNum : '';
        homeAddress = deals? deals.homeAddress : '';
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

      .Inputs{
          margin-left:30px;
      }
  </style>

<div class="Inputs">
    <Textfield bind:value={firstName} placeholder="First name"/>
</div>
<div class="Inputs">
    <Textfield bind:value={lastName} placeholder="Last Name"/>
</div>
<div class="Inputs">
    <Textfield bind:value={email} placeholder="Email"/>
</div>
<div class="Inputs">
    <Textfield bind:value={phoneNum} placeholder="(555)555-5555"/>
</div>
<div class="Inputs">
    <Textfield bind:value={homeAddress} placeholder="10001 street"/>
</div>
  
  <div class='buttons'>
      <Button on:click={create} disabled="{!firstName || !lastName || !email ||!phoneNum || !homeAddress}">create</Button>
      <Button on:click={update} disabled="{!firstName || !lastName || !email ||!phoneNum || !homeAddress}">update</Button>
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
          {#each deals as item}
            <Row>
                <Cell>{item.firstName}</Cell>
                <Cell>{item.lastName}</Cell>
                <Cell>{item.email}</Cell>
                <Cell>{item.phoneNum}</Cell>
                <Cell>{item.homeAddress}</Cell>
            </Row>
          {/each}
        </Body>
      </DataTable>
    </div>
  </body>