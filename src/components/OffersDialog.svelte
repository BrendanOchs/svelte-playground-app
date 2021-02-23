<script>
    import Dialog, {Title, Content, Actions} from '@smui/dialog';
    import Button from '@smui/button';
    import Textfield from '@smui/textfield';
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
    let dialog;
    export let data = {
        title: "Title",
        content: "Body text",
        actions: ["No", "Yes"],
        car: {
            id: 0,
            brand: "",
            model: "",
            year: 2000,
            price: 0,
            color: "",
            img: ""
        },
        reason: "edit"
    };
    export function open() {
        dialog.open()
    }
    function emit(reason) {
        dispatch(reason,data.car)
    }
</script>

<style>
    .split {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .mt-20 {
        margin-top: 20px;
    }
    .m-10 {
        margin: 10px;
    }
</style>

<Dialog bind:this={dialog} aria-labelledby="title" aria-describedby="content">
    <Title id="title">{data.title}</Title>
    <Content id="content">
        {#if data.reason != "delete"}
            <div class="split">
                <span class="m-10"><Textfield bind:value={data.car.brand} label="Brand" /></span>
                <span class="m-10"><Textfield bind:value={data.car.model} label="Model" /></span>
                <span class="m-10"><Textfield type="number" input$step="1" input$min="1900" input$max="2021" bind:value={data.car.year} label="Year" /></span>
                <span class="m-10"><Textfield bind:value={data.car.color} label="Color" /></span>
                <span class="m-10"><Textfield type="number" input$step="1000" input$min="0" bind:value={data.car.price} label="Price" /></span>
                <span class="m-10"><Textfield type="url" bind:value={data.car.img} label="Link" /></span>
            </div>
        {:else}
            {data.content}
        {/if}
    </Content>
    <Actions>
        {#each data.actions as action}
            <Button on:click={() => emit(action.toLowerCase())}>
                {action}
            </Button>
        {/each}
    </Actions>
</Dialog>