<script>
    import personimg from 'images/stock_person_image.jpg';

    let leftBio = false;
    let centerBio = false;
    let rightBio = false;
</script>

<style>
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
        height: 30px;
        border: none;
        border-radius: 3px;
	}

    .leftBio, .centerBio, .rightBio {
        display: none;
    }
</style>

<div class="cont">
    <div class="row">
        <div class="col-md-4">
            <img class="img-responsive person" src="{personimg}" alt="Person">
            <h2>John Doe</h2>
            <button on:click="{() => leftBio = !leftBio}">{leftBio ? 'Hide' : 'Show'} Bio</button>
            <p class:leftBio={!leftBio} on:click="{() => leftBio = !leftBio}">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
                id est laborum.
            </p>
        </div>
        <div class="col-md-4">
            <img class="img-responsive person" src="{personimg}" alt="Person">
            <h2>John Doe</h2>
            <button on:click="{() => centerBio = !centerBio}">{centerBio ? 'Hide' : 'Show'} Bio</button>
            <p class:centerBio={!centerBio} on:click="{() => centerBio = !centerBio}">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
                id est laborum.
            </p>
        </div>
        <div class="col-md-4">
            <img class="img-responsive person" src="{personimg}" alt="Person">
            <h2>John Doe</h2>
            <button on:click="{() => rightBio = !rightBio}">{rightBio ? 'Hide' : 'Show'} Bio</button>
            <p class:rightBio={!rightBio} on:click="{() => rightBio = !rightBio}">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
                id est laborum.
            </p>
        </div>
    </div>
</div>