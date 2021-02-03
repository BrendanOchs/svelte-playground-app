<script>
    export let percent;
    let color;
    function barColor(){
        if(percent < 20){
            color = '#cf2020';
        }
        else if(percent < 60){
            color = '#bfbf20';
        }
        else{
            color = '#2020cf';
        }
    }
    myElement.style.setProperty('--cBar', color)
</script>
<style>
    myElement{
        --cBar: ;
    }
    progress[value]{
        appearance:none;
        background-color:var(--cBar);

    }
</style>

<progress value={percent} max="100"></progress>