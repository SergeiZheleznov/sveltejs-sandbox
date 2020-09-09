<script lang="ts">
  import Clock from '../../components/Clock/Clock.svelte';
  import ApiStatus from '../../components/ApiStatus/ApiStatus.svelte';
  import location from '../../stores/station-store';
  import type { IDeutscheBahnApiService } from '../../interfaces';

  export let dbApiService: IDeutscheBahnApiService;
</script>
<div class="header">
  <div class="main-col">
    {$location ? $location.name : '...'}
  </div>
  <div class="secondary-col">
    <Clock />
    <ApiStatus dbApiService={dbApiService} />
  </div>
</div>

<style>
  .header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
	}
	.main-col {
		flex-grow: 1;
		font-size: 2rem;
	}
	.secondary-col {
		flex-grow: 0;
		display: inline-flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
	}
</style>