<script lang="ts">
  import Clock from '../../components/Clock/Clock.svelte';
  import location from '../../stores/station-store';

</script>
<div class="header">
  <div class="main-col">
    <a href="/">{$location ? $location.name : '...'}</a>
  </div>
  <div class="secondary-col">
    <Clock />
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