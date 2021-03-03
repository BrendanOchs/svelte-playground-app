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
					<Title>Final Offer</Title>
				</Section>
				<Section align="end" toolbar>
					<Button
						aria-current={segment === undefined ? 'page' : undefined}
						href=".">
						<Label>Home</Label>
					</Button>
					<Button
						aria-current={segment === 'about' ? 'page' : undefined}
						href="about">
						<Label>What we do</Label>
					</Button>
					<Button
						aria-current={segment === 'why' ? 'page' : undefined}
						href="why">
						<Label>Why Final Offer</Label>
					</Button>
					<Button
						aria-current={segment === 'profile' ? 'page' : undefined}
						href="profile">
						<Label>Profile</Label>
					</Button>
					<Button
						aria-current={segment === 'offer' ? 'page' : undefined}
						href="offer">
						<Label>Offer</Label>
					</Button>
					<Button
						aria-current={segment === 'faq' ? 'page' : undefined}
						href="faq">
						<Label>FAQ</Label>
					</Button>
					<Button
						aria-current={segment === 'blog' ? 'page' : undefined}
						href="blog">
						<Label>Blog</Label>
					</Button>
				</Section>
			</Row>
		</TopAppBar>
		<div />
	</div>
</div>
