<svelte:head>
	<title>About</title>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
</svelte:head>

<style>
	.flex-container {
		border: 1px dashed red;
		display: flex;
		padding: 0;
		margin: 0;
		flex-direction: row;
	}

	.flex-item {
		border: 1px dashed grey;
		padding: 5px;
		margin-top: 10px;
		margin: 5px;
	}

	.flex-item.video {
		width: 550px;
	}

	h1 {
		text-align: center;
	}

</style>

<h1>About this site</h1>

<div class="flex-container about">
	<div class="flex-item description">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor nulla tincidunt sem dignissim sagittis.
			Mauris non laoreet lacus, ac facilisis nulla. Sed faucibus sodales venenatis. Nunc mauris nisl, tempus sit
			amet metus vel, condimentum tempor enim. Pellentesque sit amet mi mi. Cras aliquam mollis risus, a luctus
			sem facilisis nec. Curabitur bibendum eu odio sed elementum. Mauris pellentesque feugiat orci in 
			pellentesque. Nulla sodales, dolor eget porttitor accumsan, turpis elit efficitur nulla, eu consectetur
			nibh odio id ligula.
			<br>
			Integer eget volutpat elit, convallis iaculis mi. Suspendisse id dui et sem placerat vulputate in non tellus.
			Morbi auctor sagittis nisl vel convallis. Proin venenatis quam lacinia, vulputate metus condimentum, 
			condimentum lorem. Sed vitae nisl nec elit convallis vehicula. Nunc sapien mauris, rutrum finibus leo semper,
			consectetur sollicitudin lacus. Phasellus vitae consectetur dolor. Ut suscipit est non diam sollicitudin, nec 
			feugiat ligula auctor. Nullam vel odio nisi. Sed accumsan velit nec purus fermentum, et viverra velit tincidunt. 
			Suspendisse faucibus nisl sem, ac vulputate sapien accumsan sit amet. Quisque a sodales arcu, sed vestibulum sem.
		</p>
	</div>
	<div class="flex-item video">
		<!-- <video poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg" src="https://www.youtube.com/watch?v=zakwgiLakoc"
		on:mousemove={handleMousemove}
		on:mousedown={handleMousedown}
		bind:duration
		bind:paused><track kind="captions"></video> -->
			Video
	</div>
</div>

<script>
	// These values are bound to properties of the video
	let time = 0;
	let duration;
	let paused = true;

	let showControls = true;
	let showControlsTimeout;

	function handleMousemove(e) {
		// Make the controls visible, but fade out after
		// 2.5 seconds of inactivity
		clearTimeout(showControlsTimeout);
		showControlsTimeout = setTimeout(() => showControls = false, 2500);
		showControls = true;

		if (!(e.buttons & 1)) return; // mouse not down
		if (!duration) return; // video not loaded yet

		const { left, right } = this.getBoundingClientRect();
		time = duration * (e.clientX - left) / (right - left);
	}

	function handleMousedown(e) {
		// we can't rely on the built-in click event, because it fires
		// after a drag — we have to listen for clicks ourselves

		function handleMouseup() {
			if (paused) e.target.play();
			else e.target.pause();
			cancel();
		}

		function cancel() {
			e.target.removeEventListener('mouseup', handleMouseup);
		}

		e.target.addEventListener('mouseup', handleMouseup);

		setTimeout(cancel, 200);
	}
</script>