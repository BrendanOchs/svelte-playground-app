<script>
	import personimg from 'images/stock_person_image.jpg';
</script>

<style>
	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	h2 {
		font-size: 1.5em;
		text-align: center;
	}

	p {
		text-align: center;
		margin: 1em auto;
	}

	.cont {
		width: 750px;
		margin: 10px auto;
	}

	.col-md-4 {
		padding: 2px 10px;
		border-radius: 4px;
		width: 255px;
		margin-left: 5px;
		margin-bottom: 10px;
		background-color: lightcoral;
	}

	.img-responsive.person {
		width: 135px;
		height: 135px;
		border-radius: 50%;
		margin: 10px auto;
		padding: 0;
	}

	button {
		display: block;
		margin: 10px auto;
	}
</style>

<!-- HTML/Svelte starts here; Not sure if I can make seperate files for them -->

<div class="cont">
	<div class="row">
		<div class="col-md-4">
			<img class="img-responsive person" src="{personimg}" alt="Person">
			<h2>Romina Diaz-Rivero</h2>
			<button id="button-left" onclick="showVsHideLeft()" type="button" class="btn btn-light">Show Bio</button>
			<p id="bio-left"></p>
		</div>
		<div class="col-md-4">
			<img class="img-responsive person" src="{personimg}" alt="Person">
			<h2>John Doe</h2>
			<button id="button-center" onclick="showVsHideCenter()" type="button" class="btn btn-light">Show Bio</button>
			<p id="bio-center"></p>
		</div>
		<div class="col-md-4">
			<img class="img-responsive person" src="{personimg}" alt="Person">
			<h2>Name Filler</h2>
			<button id="button-right" onclick="showVsHideRight()" type="button" class="btn btn-light">Show Bio</button>
			<p id="bio-right"></p>
		</div>
	</div>
	<script>
		// I couldn't get the link to work seperately, so I had to do inline JS
		let countRight = 0;
		let countCenter = 0;
		let countLeft = 0;

		function showVsHideLeft() {
			countLeft++;
			console.log("Number of times clicked is " + countLeft)
			if (countLeft % 2 == 0) {
					document.getElementById("button-left").innerHTML = "Show Bio"
					document.getElementById("bio-left").innerHTML = ""
				} else {
					document.getElementById("button-left").innerHTML = "Hide Bio"
					document.getElementById("bio-left").innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				}
			}
			function showVsHideCenter() {
				countCenter++;
				console.log("Number of times clicked is " + countCenter)
				if (countCenter % 2 == 0) {
						document.getElementById("button-center").innerHTML = "Show Bio"
						document.getElementById("bio-center").innerHTML = ""
					} else {
						document.getElementById("button-center").innerHTML = "Hide Bio"
						document.getElementById("bio-center").innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
					}
			}
			function showVsHideRight() {
				countRight++;
				console.log("Number of times clicked is " + countRight)
				if (countRight % 2 == 0) {
						document.getElementById("button-right").innerHTML = "Show Bio"
						document.getElementById("bio-right").innerHTML = ""
					} else {
						document.getElementById("button-right").innerHTML = "Hide Bio"
						document.getElementById("bio-right").innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
					}
			}
	</script>
</div>