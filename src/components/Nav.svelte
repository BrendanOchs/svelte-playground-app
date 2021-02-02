<script>
	export let segment;
	import Button, { Label } from "@smui/button";
	import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
	import IconButton from "@smui/icon-button";
import About from "../routes/about.svelte";
import Reels from "./Reels.svelte";

	export function pageSwitch(){
        
    }
</script>

<div class="flexy">
	<div class="top-app-bar-container">
		<TopAppBar variant="static">
			<Row>
				<Section>
					<IconButton class="material-icons">menu</IconButton>
					<Title>Static</Title>
				</Section>
				<Section align="end" toolbar>
					<Button>
						<Label>Search</Label>
					</Button>
					<Button>
						<Label>Facts</Label>
					</Button>
					<Button on:click={pageSwitch}>
						<Label>Reels</Label>
					</Button>
				</Section>
			</Row>
		</TopAppBar>
		<div />
	</div>
</div>
