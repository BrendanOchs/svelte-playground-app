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

	.container {
		border: 1px dashed gold;
		text-align: center;
	}

	h1 {
		text-align: center;
	}
	.flex-container {
		justify-content: center;
	}
	.flex-item {
		width: 30%;
	}

</style>

<h1>About this site</h1>

<div class="container">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor nulla tincidunt sem dignissim sagittis.
			Mauris non laoreet lacus, ac facilisis nulla. Sed faucibus sodales venenatis. Nunc mauris nisl, tempus sit
			amet metus vel, condimentum tempor enim. Pellentesque sit amet mi mi. Cras aliquam mollis risus, a luctus
			sem facilisis nec. Curabitur bibendum eu odio sed elementum. Mauris pellentesque feugiat orci in 
			pellentesque. Nulla sodales, dolor eget.
			<br>
			Integer eget volutpat elit, convallis iaculis mi. Suspendisse id dui et sem placerat vulputate in non tellus.
			Morbi auctor sagittis nisl vel convallis. Proin venenatis quam lacinia, vulputate metus condimentum, 
			condimentum lorem. Sed vitae nisl nec elit convallis vehicula. Nunc sapien mauris, rutrum finibus leo semper,
			consectetur sollicitudin lacus. Phasellus vitae consectetur dolor. Ut suscipit est non diam sollicitudin, nec 
			feugiat ligula auctor. Nullam vel odio nisi. Sed accumsan velit nec purus fermentum, et viverra velit tincidunt. 
			Suspendisse faucibus nisl sem, ac vulputate sapien accumsan sit amet. Quisque a sodales arcu, sed vestibulum sem.
		</p>
</div>

<div class="flex-container">
    {#each users as userdetails}
        <div class="flex-item">
            <UserDetail user="{userdetails}"></UserDetail>
        </div>  
    {/each}
</div>
 
<script>
    import UserDetail from '../components/UserDetail.svelte'
    const users = [
        {
            name: 'Oliver Kingston',
            role: 'Lead Developer',
            bio: 'Oliver is our lead developer at the company. He has been with us for 10+ years and has really helped the company out.'
        }, 
        {
            name: 'Danica Rosenburg',
            role: 'Marketing Executive',
            bio: 'Danica is our superstar marketing executive. She has been with us for 2 years, and it wouldn\'t be the same without her.'
        },  
        {
            name: 'Abdul Solomon',
            role: 'Network Administrator',
            bio: 'Abdul is the company\'s network administrator. He has just started this year and we are excited to see what he can do.'
        }
    ]
</script>
