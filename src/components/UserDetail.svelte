<script>
    export let user;
    let showProfile=false;
    const showBio=() => showProfile = !showProfile;
</script>
 
<style>
    .dropbtn {
        margin-left: 195px;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .dropbtn:hover{
        background-color: yellow;
    }
    .dropdown {
        position: relative;
        display: inline-block;
    }
    .container {
        border: 1px solid black
    }
    h4 {
        text-align: center;
        margin: 0 auto;
    }
    p {
        text-align: center;
        margin: 0 auto;
    }
    .img-responsive {
        border-radius: 50%;
        width: 50%;
        max-width: 400px;
        margin: 0 0 1em 0;
        margin-left: 115px;
        margin-top: 10px;
    }
    .showProfile {
        display:none;
    }
</style>
 
<div class="container">
    <img class="img-responsive" src="person.jpg" alt="placeholder"> 
    <h4>{user.name}</h4>
    <p>{user.role}</p>
    <div class="dropdown">
    <button on:click="{showBio}" class="dropbtn">Hide Bio</button>
    <p class:showProfile={showProfile}>{user.bio}</p>
    </div>
</div>