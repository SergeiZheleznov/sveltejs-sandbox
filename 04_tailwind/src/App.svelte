<script lang="ts">
  import { setContext } from 'svelte';
  import ElementSection from './ElementSection.svelte';
  import { ELEMENT_STORE_KEY } from './models/Constants';
  import type { IAppContext } from './models/IAppContext';
  import { ApiService } from './services/ApiService';
  import { ElementStore } from './stores';

  const apiService = new ApiService('%APP_API_URL%');
  const elementStore = ElementStore(apiService);

  setContext<IAppContext>(ELEMENT_STORE_KEY, { elementStore });

  const title = '%APP_NAME%';
</script>

<main class="border-indigo-600">
  <h1>Hello {title}!</h1>

  <ElementSection />

  <p>
    Visit the <a
      class="text-blue-600 text-4xl underline"
      href="https://svelte.dev/tutorial">Svelte tutorial</a
    > to learn how to build Svelte apps.
  </p>
  <div class="bg-indigo-50">
    <div
      class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between"
    >
      <h2
        class="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl"
      >
        <span class="block">Ready to dive in?</span>
        <span class="block text-indigo-600">Start your free trial today.</span>
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md shadow">
          <a
            href="/"
            class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Get started {title}
          </a>
        </div>
      </div>
    </div>
  </div>
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
