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

<button class="item" class:active="{active}" on:click="{onClickHandler}">
  {station.name}
</button>

<style>
  .item {
    padding: .2rem 1rem;
    font-size: .8rem;
    border: 1px solid #444;
    display: inline-block;
    margin-bottom: 0.3rem;
    outline: none;
    cursor: pointer;
  }
  .active {
    background: #444;
    color: white;
  }
</style>