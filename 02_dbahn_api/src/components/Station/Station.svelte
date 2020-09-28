<script lang="ts">
  import type { IStation } from '../../interfaces';
  import {createEventDispatcher} from 'svelte';

  export let station: IStation;
  export let active: boolean = true;

  const dispatch = createEventDispatcher();

  const onClickHandler = () => {
    dispatch('stationselect', station);
  }
</script>

<a href="#/{`${station.primaryEvaId}/table`}" class:active="{active}" on:click="{onClickHandler}">
  {station.name}
</a>

<style>
  a {
    display: inline-block;
    width: 20%;
    text-align: center;
  }
</style>