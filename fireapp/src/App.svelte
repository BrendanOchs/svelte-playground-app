<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  let firebaseConfig = {
    apiKey: "AIzaSyB0z0rwqjKC4TYIk5dBt8DPcMajBiWUb3Q",
    authDomain: "final-offer.firebaseapp.com",
    projectId: "final-offer",
    storageBucket: "final-offer.appspot.com",
    messagingSenderId: "273393139223",
    appId: "1:273393139223:web:6673f43526de03856ee652",
  };

  firebase.initializeApp(firebaseConfig);

  let email = "";
  let password = "";

  function signUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  function login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }
</script>

<!-- Styles -->
<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1,
  em {
    color: #ff3e00;
  }

  hr {
    height: 1px;
    border: none;
    background: rgb(195, 195, 195);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  {#if !firebaseConfig.projectId}
    <strong>Step 0</strong>
    Create a
    <a href="https://firebase.google.com/">Firebase Project</a>
    and paste your web config into
    <code>App.svelte</code>
    .
  {/if}

  <!-- 1. 🔥 Firebase App -->
  <FirebaseApp {firebase}>
    <h1>Final Offer</h1>

    <!-- 2. 😀 Get the current user -->
    <User let:user let:auth>
      Hi!
      <em>{user.email}</em>

      <button on:click={() => auth.signOut()}>Sign Out</button>

      <div slot="signed-out">
        <div><input placeholder="email" type="email" bind:value={email} /></div>
        <div>
          <input placeholder="password" type="password" bind:value={password} />
        </div>
        <button on:click={signUp}>Sign Up</button>
        <button on:click={login}>Login</button>
      </div>

      <hr />

      <!-- 3. 📜 Get a Firestore document owned by a user -->
      <Doc path={`posts/${user.uid}`} let:data={post} let:ref={postRef} log>
        <h2>{post.title}</h2>

        <p>Last Updated <em>{new Date(post.createdAt).toLocaleString()}</em></p>

        <span slot="loading">Loading Offers...</span>
        <span slot="fallback">
          <button
            on:click={() => postRef.set({
                title: 'Profile',
                createdAt: Date.now(),
              })}>
            My Offers
          </button>
        </span>

        <!-- 4. 💬 Get all the comments in its subcollection -->

        <h3>Offers</h3>
        <Collection
          path={postRef.collection('comments')}
          query={(ref) => ref.orderBy('createdAt')}
          let:data={comments}
          let:ref={commentsRef}
          log>
          {#if !comments.length}No offers yet...{/if}

          {#each comments as comment}
            <p>
              <!-- ID: <em>{comment.ref.id}</em> -->
            </p>
            <p>
              {comment.text}
              <button on:click={() => comment.ref.delete()}>Delete Offer</button>
            </p>
          {/each}

          <button
            on:click={() => commentsRef.add({
                text: '6783925834259v7834',
                createdAt: Date.now(),
              })}>
            Add Offer
          </button>

          <span slot="loading">Loading offers...</span>
        </Collection>
      </Doc>
    </User>
  </FirebaseApp>
</main>
