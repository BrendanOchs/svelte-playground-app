<script>
    export let segment;
    import {slide} from 'svelte/transition';
    import slideSteps from 'images/slideSteps.png';
    import slideWhy from 'images/slideWhy.png';
    import slideWWA from 'images/slideWWA.png';
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
    img{
        width:100%;
        height:100%
    }
</style>

<div class="steps">
    {#if slideNum == 0}
        <img transition:slide alt="Steps" src="{slideSteps}"><!--This will be the component of the slide-->
    {/if}
    {#if slideNum == 1}
        <img transition:slide alt="Why" src="{slideWhy}"><!--This will be the component of the slide-->
    {/if}
    {#if slideNum == 2}
        <img transition:slide alt="Who We Are" src="{slideWWA}"><!--This will be the component of the slide-->
    {/if}
</div>
<button on:click={prevSlide}>prev</button>
<button on:click={nextSlide}>next</button>
