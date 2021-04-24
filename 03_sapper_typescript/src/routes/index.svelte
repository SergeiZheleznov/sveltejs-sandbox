<script>
  import successkid from "images/successkid.jpg";
</script>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<figure>
  <img alt="Success Kid" src={successkid} />
  <figcaption>Have fun with Sapper!</figcaption>
</figure>

<p>
  <strong
    >Try editing this file (src/routes/index.svelte) to test live reloading.</strong
  >
</p>

<style style lang="postcss">
  h1,
  figure,
  p {
    @apply text-center;
    @apply mx-auto;
  }
  h1 {
    @apply text-purple-600;
  }
</style>
