<script>
    export let percent;
    let color = '#202020';
    function barColor(){
        if(percent < 20){
            color = '#ef2020';
        }
        else if(percent < 60){
            color = '#dfef20';
        }
        else{
            color = '#20ef20';
        }
    }
    barColor();
</script>
<style>
    #buffer{
        width: 100%;
        height: 50%;
        background: #c9c9c9
    }
    #bar{
        margin-left: 0;
        margin-right: auto;
    }
</style>

<div id="buffer">
    <div id="bar" style="background: {color}; width: {percent}%;">
        <p>.</p>
    </div>
</div>
