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
            <Content>Lorem ipsum dolor sit amet, consectetur adipiscing elit?<IconButton class="material-icons" on:click={() =>  pressed = !pressed}>add</IconButton></Content>
            {#if pressed == true}
                <div transition:slide>
                    <p>Eu sem integer vitae justo eget magna.</p>
                </div>
            {/if}
        </Card>
    </div>
    <div class="flex-item">
        <Card padded>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?
            <p>1. Vitae justo eget magna</p>
            <p>2. Adipiscing elit sed</p>
            <p>3. Eu sem integer</p>
        </Card>
    </div>
    <div class="flex-item">
        <Card padded>

        </Card>
    </div>
    
    
</div>

<div class="container">
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
</div>
