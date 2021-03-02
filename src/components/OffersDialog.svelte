<script>
    import Dialog, {Title, Content, Actions} from '@smui/dialog';
    import Select, {Option} from '@smui/select';
    import Icon from '@smui/select/icon/index';
    import Button from '@smui/button';
    import Textfield from '@smui/textfield';
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
    let dialog;
    let brands = [
        {
            name: "Toyota",
            icon: "https://www.iconsdb.com/icons/preview/soylent-red/toyota-xxl.png"
        },
        {
            name: "Honda",
            icon: "https://d2dgtayfmpkokn.cloudfront.net/wp-content/uploads/sites/180/2018/06/26130736/cropped-honda-icon-300x300.png"
        },
        {
            name: "Saturn",
            icon: "https://www.carlogos.org/logo/Saturn-symbol-1985-640x550.jpg"
        }
    ]
    export let data = {
        title: "Title",
        content: "Body text",
        actions: ["No", "Yes"],
        car: {
            vin: "",
            brand: "",
            model: "",
            year: 2000,
            price: 0,
            color: "",
            img: "",
            completion: 0
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
    img {
        height: 100%;
        margin-right: 10px;
    }
</style>

<Dialog bind:this={dialog} aria-labelledby="title" aria-describedby="content">
    <Title id="title">{data.title}</Title>
    <Content id="content">
        {#if data.reason != "delete"}
            <div class="split">
                <!-- <span class="m-10"><Textfield bind:value={data.car.brand} label="Brand" /></span> -->
                <span class="m-10">
                    <Select bind:value={data.car.brand} label="Brand">
                        {#each brands as brand}
                            <Option value={brand.name}><img src={brand.icon} alt="{brand.name} Icon">{brand.name}</Option>
                        {/each}
                    </Select>
                </span>
                <span class="m-10"><Textfield bind:value={data.car.model} label="Model" /></span>
                <span class="m-10"><Textfield type="number" input$step="1" input$min="1900" input$max="2100" bind:value={data.car.year} label="Year" /></span>
                <span class="m-10"><Textfield bind:value={data.car.color} label="Color" /></span>
                <span class="m-10"><Textfield type="number" input$step="1000" input$min="0" bind:value={data.car.price} label="Price" /></span>
                <span class="m-10"><Textfield type="url" bind:value={data.car.img} label="Link" /></span>
                <span class="m-10"><Textfield bind:value={data.car.vin} label="VIN" /></span>
                <span class="m-10"><Textfield type="number" input$min="0" input$max="100" bind:value={data.car.completion} label="Percent Completion" /></span>
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