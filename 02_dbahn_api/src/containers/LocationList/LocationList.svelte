<script lang="ts">
import type { ILocationResponse } from "../../interfaces";

  export let locations: ILocationResponse[];
</script>

<section>
  {#each locations as location}
    <div>
      {location.name}
    </div>
  {/each}
</section>

<style>

</style>