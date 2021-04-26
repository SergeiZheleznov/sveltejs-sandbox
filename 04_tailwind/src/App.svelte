<script lang="ts">
  import ElementSection from './ElementSection.svelte';
  import { ApiService } from 'services';
  import { ElementStore } from 'stores';
  import { setAppContext } from 'contexts';
  const apiService = new ApiService('%APP_API_URL%');
  const elementStore = ElementStore(apiService);
  setAppContext(elementStore);
</script>

<ElementSection />

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
