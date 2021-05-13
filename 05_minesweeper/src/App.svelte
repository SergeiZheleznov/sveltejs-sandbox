<script lang="ts">
  import MineField from "./components/MineField.svelte";

  import Tailwind from "./Tailwind.svelte";

  export let name: string;
</script>

<Tailwind />
<h1 class="text-red-600">{name}</h1>

<MineField colCount={10} rowCount={10} />
