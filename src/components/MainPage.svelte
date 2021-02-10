<script>
    export let segment;
    import ProgressBar from "../components/ProgressBar.svelte";
    
</script>
<div class="flex-container">
    <div class="flex-item">1</div>
    <div class="flex-item">2</div>
    <div class="flex-item">3</div>
</div>

<ProgressBar percent={5}/>
