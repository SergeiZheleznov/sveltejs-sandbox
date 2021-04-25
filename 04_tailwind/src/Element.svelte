<script lang="ts">
  import type { IElement } from './models';

  export let element: IElement;
</script>

<div class="border-indigo-600 bg-indigo-50">
  <div class="mt-3 p-3 text-base text-gray-500">
    {element.text}
  </div>
</div>
