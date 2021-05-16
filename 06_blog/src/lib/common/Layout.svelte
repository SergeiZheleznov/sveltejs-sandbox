<script>
import Tailwind from "./Tailwind.svelte";

</script>
<Tailwind />
<div class="layout">
  <slot />
</div>
<style style type="postcss">
  .layout {
    @apply max-w-7xl mx-auto sm:px-6 lg:px-8;
  }
</style>