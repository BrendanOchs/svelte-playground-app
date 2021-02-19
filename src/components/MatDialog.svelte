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
        movie: {
            id: 0,
            name: "",
            genre: "",
            desc: "",
            slogan: "",
            trailer: "",
            rating: 0
        },
        reason: "edit"
    };
    export function open() {
        console.log(data.movie)
        dialog.open()
    }
    function emit(reason) {
        dispatch(reason,data.movie)
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
                <span class="m-10"><Textfield bind:value={data.movie.name} label="Name" /></span>
                <span class="m-10"><Textfield bind:value={data.movie.genre} label="Genre" /></span>
                <span class="m-10"><Textfield bind:value={data.movie.slogan} label="Famous Quote" /></span>
                <span class="m-10"><Textfield type="url" bind:value={data.movie.trailer} label="Link" /></span>
                <span class="m-10"><Textfield style="width: 100%" type="number" bind:value={data.movie.rating} label="Rating (Out of 5 Stars)" input$step="0.1" input$min="0" input$max="5"/></span>
            </div>
            <div class="mt-20">
                <Textfield textarea fullwidth bind:value={data.movie.desc} label="Description" />
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