<style>
    #buffer{
        width: 100%;
        height: 10px;
        background: #c9c9c9;
    }
    #bar{
        margin-left: 0;
        margin-right: auto;
        height: 10px;
    }
</style>

<div id="buffer">
    <div id="bar" style="background: {color}; width: {percent}%;">
        
    </div>
</div>
<script>
    export let percent;
    let color = '(32,32,32)';
    /*function barColor(){
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
    barColor();*/
    let r = 255 - ((color / 100) * 255);
    let g = ((color / 100) * 255);
</script>