<script>
    export let percent;
    let color = '#202020';
    function barColor(){
        if(percent < 20){
            color = '#cf2020';
        }
        else if(percent < 60){
            color = '#bfbf20';
        }
        else{
            color = '#20cf20';
        }
    }
    import LinearProgress from '@smui/linear-progress';

</script>


<LinearProgress style="color: #ff0000"  progress={percent}/>
