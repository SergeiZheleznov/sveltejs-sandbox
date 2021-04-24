<script lang="ts">
  import { getContext } from "svelte";
  import { ELEMENT_STORE_KEY } from "./models";
  import type { IAppContext } from "./models/IAppContext";
  const { elementStore } = getContext<IAppContext>(ELEMENT_STORE_KEY);
</script>

{#await $elementStore.getElements()}
  <p>waiting for the promise to resolve...</p>
{:then}
  {#each $elementStore.elements as el}
    <div>
      {el.text}
    </div>
  {/each}
{:catch error}
  <p>Something went wrong: {error.message}</p>
{/await}
