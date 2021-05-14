<script lang="ts">
  import { MineField } from "src/components";

  import Tailwind from "./Tailwind.svelte";

  export let name: string;
</script>

<Tailwind />
<h1 class="text-red-600">{name}</h1>

<MineField />
