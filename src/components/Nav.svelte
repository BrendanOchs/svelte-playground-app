<script>
	export let segment;

	import Button, { Label } from "@smui/button";
	import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
	import IconButton from "@smui/icon-button";
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
						<Label>Button 1</Label>
					</Button>
					<Button>
						<Label>Button 2</Label>
					</Button>
					<Button>
						<Label>Button 3</Label>
					</Button>
				</Section>
			</Row>
		</TopAppBar>
		<div />
	</div>
</div>
