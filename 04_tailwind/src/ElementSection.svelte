<script lang="ts">
  import { Button } from 'components';
  import Element from './Element.svelte';
  import { getAppContext } from 'contexts';
  const { elementStore } = getAppContext();
  let promise = elementStore.getElements();
  const fetchElements = async () => {
    promise = elementStore.getElements();
  };
</script>

<div class="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
  <div class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
    <div>
      <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Press</h2>
      <div class="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
        <div
          class="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex"
        >
          <Button
            name={'Fetch Elements'}
            on:click={async () => {
              await fetchElements();
            }}
          />
          <Button
            name={'Add element'}
            on:click={async () => {
              elementStore.addElement({
                id: 'asd',
                text: 'sksdes'
              });
            }}
          />
        </div>
      </div>
    </div>

    {#await promise}
      <div>Loading</div>
    {:then}
      <div class="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
        {#each $elementStore as el}
          <Element element={el} />
        {/each}
      </div>
    {/await}
  </div>
</div>
