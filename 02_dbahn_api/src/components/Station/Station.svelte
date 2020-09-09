<script lang="ts">
  import type { IStation } from '../../interfaces';
  import {createEventDispatcher} from 'svelte';
import type { space } from 'svelte/internal';

  export let station: IStation;
  export let active: boolean = true;

  const dispatch = createEventDispatcher();

  const onClickHandler = () => {
    dispatch('stationselect', station);
  }
</script>

<div class="item">
  <div class="wrapper" class:active="{active}">
    <div class="image">
      <img src="{station.picture.url}" alt="{station.name}" />
    </div>
    <div class="meta">
      <span>{station.name}</span>
      <div class="actions">
        <button on:click="{onClickHandler}">
          ArrivalBoard
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .item {
    padding: .2rem;
    margin-bottom: .2rem;
    border: 1px solid #444;
  }
  .wrapper {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .active {
    background: #444;
    color: white;
  }

  .meta {
    flex-grow: 1;
  }

  .image {
    flex-grow: 0;
  }
  .image img {
    max-height: 96px;
  }

  .actions {
    margin-top: 6px;
    display: flex;
  }
</style>