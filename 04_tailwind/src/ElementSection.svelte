<script lang="ts">
  import { getContext, onMount } from "svelte";
  import Element from "./Element.svelte";
  import { ELEMENT_STORE_KEY } from "./models";
  import type { IAppContext } from "./models/IAppContext";
  const { elementStore } = getContext<IAppContext>(ELEMENT_STORE_KEY);
  let loading: boolean = false;

  const fetchElements = async () => {
    loading = true;
    await $elementStore.getElements();
    loading = false;
  };

  onMount(async () => {
    await fetchElements();
  });
</script>

<div class="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
  <div
    class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl"
  >
    <div>
      <h2
        class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl"
      >
        Press
      </h2>
      <div class="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
        <p class="text-xl text-gray-500">
          Get weekly articles in your inbox on how to grow your business.
        </p>

        <div
          class="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex"
        >
          <button
            type="button"
            on:click={async () => {
              await fetchElements();
            }}
            class="w-full bg-indigo-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex"
          >
            Notify me
          </button>
        </div>
      </div>
    </div>
    <div class="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
      {#if !loading}
        {#each $elementStore.elements as el}
          <Element element={el} />
        {/each}
      {:else}
        <div>Loading...</div>
      {/if}
    </div>
  </div>
</div>
