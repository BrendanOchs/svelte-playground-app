<script>
    export let user;
    let showProfile=false;
    const showBio=() => showProfile = !showProfile;
</script>
 
<style>
    .dropbtn {
        margin-left: 205px;
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
    h5{
        text-align: center;
        margin: 0 auto;
    }
    p {
        text-align: center;
        margin: 0 auto;
    }
    .img-responsive {
        border-radius: 50%;
        width: 100%;
        max-width: 400px;
        margin: 0 0 1em 0;
    }
    .showProfile {
        display:none;
    }
</style>
 
<div class="container">
    <img class="img-responsive" src="person.jpg" alt="placeholder"> 
    <h5>{user.name}</h5>
    <p>{user.role}</p>
    <div class="dropdown">
    <button on:click="{showBio}" class="dropbtn">Show Bio</button>
    <p class:showProfile={showProfile}>{user.bio}</p>
    </div>
</div>