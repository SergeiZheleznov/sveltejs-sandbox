<script lang="ts">
  import type { IElement } from './models';

  export let element: IElement;
</script>

<div>
  <p class="text-sm text-gray-500">
    <time datetime="2020-02-12">Feb 12, 2020</time>
  </p>
  <a href="/" class="mt-2 block">
    <p class="text-xl font-semibold text-gray-900">Fact</p>
    <p class="mt-3 text-base text-gray-500">
      {element.text}
    </p>
  </a>
</div>
