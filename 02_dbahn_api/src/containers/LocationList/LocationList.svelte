<script lang="ts">
  import type { ILocationResponse } from "../../interfaces";
  import Chip, {Set, Icon, Checkmark, Text} from '@smui/chips';
  export let locations: ILocationResponse[];
</script>

<section>
  {#each locations as location}
    <Chip shouldRemoveOnTrailingIconClick={false}>
      <Text>{location.name}</Text>
    </Chip> 
  {/each}
</section>

<style>

</style>