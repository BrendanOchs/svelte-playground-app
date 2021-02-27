<svelte:head>
    <title>FAQ</title>
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
</svelte:head>

<script>
    import Card, {Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons} from '@smui/card';
    import IconButton, {Icon} from '@smui/icon-button';
    import Button, {Label} from '@smui/button';
    import {slide} from 'svelte/transition';

    let pressed = false;
    let pressed2 = false;
    let pressed3 = false;

    let icon1 = "add";
    let icon2 = "add";
    let icon3 = "add";

    if (pressed == true) {
        icon1 = "remove";
    } else if (pressed2 == true) {
        icon2 = "remove";
    }

</script>

<style>
    .heading {
        margin-left: 10px;
    }
    .flex-container.faq {
        margin: 0 auto;
        border: 1px solid black;
        flex-direction: column;
    }

    .flex-item {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: red;
        background-color: #f8f8f8;
        margin-right: 20px;
        margin-bottom: 20px;
    }
</style>

<div class="heading">
    <h1>Frequently Asked Questions</h1>
    <p>Here are the questions we are asked the most.</p>
</div>

<div class="flex-container faq">
    <div class="flex-item">
        <Card style="width: 100%" padded>
            <Content>Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                <IconButton class="material-icons" on:click={() =>  pressed = !pressed}>{icon1}</IconButton>
            </Content>
            {#if pressed == true}
                <div transition:slide>
                    <p>Eu sem integer vitae justo eget magna.</p>
                </div>
            {/if}
        </Card>
    </div>
    <div class="flex-item">
        <Card style="width: 100%" padded>
            <Content>Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                <IconButton class="material-icons" on:click={() =>  pressed2 = !pressed2}>{icon2}</IconButton>
            </Content>
            {#if pressed2 == true}
                <div transition:slide>
                    <p>1. Vitae justo eget magna</p>
                    <p>2. Adipiscing elit sed</p>
                    <p>3. Eu sem integer</p>
                </div>
            {/if}
        </Card>
    </div>
    <div class="flex-item">
        <Card style="width: 100%" padded>
            <Content>Lorem ipsum dolor sit amet, consectetur adipiscing elit?<IconButton class="material-icons" on:click={() =>  pressed3 = !pressed3}></IconButton></Content>
            {#if pressed3 == true}
                <div transition:slide>
                    <p>Eu sem integer vitae justo eget magna.</p>
                </div>
            {/if}
        </Card>
    </div>
    
    
</div>

<!-- <div class="container">
    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</h4>
    <p>Eu sem integer vitae justo eget magna.</p>
    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</h4>
    <p>1. Vitae justo eget magna</p>
    <p>2. Adipiscing elit sed</p>
    <p>3. Eu sem integer</p>
    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</h4>
    <p>Eu sem integer vitae justo eget magna.</p>
    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</h4>
    <p>Eu sem integer vitae justo eget magna.</p>
    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</h4>
    <p>Eu sem integer vitae justo eget magna.</p>
    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</h4>
    <p>Video will go here</p>
</div> -->
