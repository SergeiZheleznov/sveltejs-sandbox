<script lang="ts">
  import { ELEMENT_STORE_KEY } from 'common/Constants';
  import { setContext } from 'svelte';
  import ElementSection from './ElementSection.svelte';
  import type { IAppContext } from 'models';
  import { ApiService } from 'services';
  import { ElementStore } from './stores';

  const apiService = new ApiService('%APP_API_URL%');
  const elementStore = ElementStore(apiService);
  setContext<IAppContext>(ELEMENT_STORE_KEY, { elementStore });
</script>

<ElementSection />

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
