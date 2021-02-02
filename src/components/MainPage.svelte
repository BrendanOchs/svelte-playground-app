<!-- <script>
    let movies = [{
  "id": 1,
  "name": "10",
  "genre": "Comedy | Romance",
  "desc": "Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.",
  "slogan": "engage dot-com architectures"
}, {
  "id": 2,
  "name": "Paz!",
  "genre": "Comedy",
  "desc": "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
  "slogan": "incubate dot-com metrics"
}, {
  "id": 3,
  "name": "More Than Honey",
  "genre": "Documentary",
  "desc": "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
  "slogan": "embrace strategic content"
}, {
  "id": 4,
  "name": "Sixteen Candles",
  "genre": "Comedy | Romance",
  "desc": "Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
  "slogan": "engineer proactive niches"
}, {
  "id": 5,
  "name": "Point of Order",
  "genre": "Documentary",
  "desc": "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
  "slogan": "synergize leading-edge supply-chains"
}, {
  "id": 6,
  "name": "Opposite Day",
  "genre": "Children | Comedy",
  "desc": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum.",
  "slogan": "repurpose proactive networks"
}, {
  "id": 7,
  "name": "Dangerous Minds",
  "genre": "Drama",
  "desc": "Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.",
  "slogan": "redefine out-of-the-box partnerships"
}, {
  "id": 8,
  "name": "Final Countdown, The",
  "genre": "Action | Sci-Fi",
  "desc": "Morbi a ipsum. Integer a nibh. In quis justo.",
  "slogan": "whiteboard user-centric portals"
}, {
  "id": 9,
  "name": "Nightwatch",
  "genre": "Horror | Thriller",
  "desc": "Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
  "slogan": "seize extensible metrics"
}, {
  "id": 10,
  "name": "Story of Maths, The",
  "genre": "Documentary",
  "desc": "Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.",
  "slogan": "seize compelling niches"
}]
</script>

<style>
    h4, h6, p {
        margin: 0;
    }

    h4 {
        font-size: 30px;
    }

    h6 {
        font-size: 20px;
    }

    h6, p, button {
        margin-top: 10px;
    }
</style>

<div class="flex-container">
    {#each movies as movie}
    <div class="flex-item text-center">
        <h4>{movie.name}</h4>
        <p>{movie.genre}</p>
        <h6>"{movie.slogan}"</h6>
        <button href="">See Details</button>
    </div>
    {/each}
</div> -->

<style>
  button {
    margin: 0;
    position: absolute;
    margin-top: 30px;
    left: 50%;
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }
</style>

<a href="inventory"><button>See Inventory</button></a>