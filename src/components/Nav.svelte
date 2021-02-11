<script>
	export let segment;
	import Button, { Label } from "@smui/button";
	import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
	import IconButton from "@smui/icon-button";
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
					<Button aria-current="{segment === undefined ? 'page' : undefined}" href=".">
						<Label>Home</Label>
					</Button>
					<Button aria-current="{segment === 'reels' ? 'page' : undefined}" href="reels">
						<Label>Reels</Label>
					</Button>
					<Button aria-current="{segment === 'facts' ? 'page' : undefined}" href="facts">
						<Label>Facts</Label>
					</Button>
					<Button aria-current="{segment === 'search' ? 'page' : undefined}" href="search">
						<Label>Search</Label>
					</Button>
				</Section>
			</Row>
		</TopAppBar>
		<div />
	</div>
</div>
