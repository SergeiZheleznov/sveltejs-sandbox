<script lang="ts">
  import type { ILocation } from "../../interfaces";
  export let locations: ILocation[];
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