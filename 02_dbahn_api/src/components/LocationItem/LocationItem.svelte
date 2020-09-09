<script lang="ts">
  import type { ILocation } from "../../interfaces";
  import locationStore from '../../stores/station-store';
  import {createEventDispatcher} from 'svelte';
  const dispatch = createEventDispatcher();

  export let location: ILocation;
  export let isSelected: boolean;

  const selectItem = () => {
    dispatch('itemselect', location);
  }
</script>

<button class="item" class:active="{isSelected}" on:click="{selectItem}">
  {location.name}
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