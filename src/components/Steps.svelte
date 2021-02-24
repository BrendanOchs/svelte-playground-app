<script>
    export let segment;
    import {scale} from 'svelte/transition';
    let slideNum = 0;
    function nextSlide()
    {
        if(slideNum >= 2)
        {
            slideNum = 0;
        }
        else
        {
            slideNum++;
        }
    }
    function prevSlide()
    {
        if(slideNum <= 0)
        {
            slideNum = 2;
        }
        else
        {
            slideNum--;
        }
    }
</script>

<style>
    .steps {
        background-color: gray;
        height: 450px;
    }
</style>

<div class="steps">
    {#if slideNum == 0}
        <div transition:scale>STEPS</div><!--This will be the component of the slide-->
    {/if}
    {#if slideNum == 1}
        <div transition:scale>WHY</div><!--This will be the component of the slide-->
    {/if}
    {#if slideNum == 2}
        <div transition:scale>WHO WE ARE</div><!--This will be the component of the slide-->
    {/if}
</div>
<button on:click={prevSlide}>prev</button>
<button on:click={nextSlide}>next</button>
