<script lang="ts">
  import {onMount} from 'svelte';
  import type { IDeutscheBahnApiService } from "../../interfaces";
  export let dbApiService: IDeutscheBahnApiService;

  let isServiceAvailable: boolean;
  onMount(async()=>{
    isServiceAvailable = await dbApiService.checkApiAvailabillity();
  })

  const onClickHandler = async (e) => {
    isServiceAvailable = await dbApiService.checkApiAvailabillity();
  }
</script>

<div>
  <button class:available={isServiceAvailable} on:click={onClickHandler}></button>
</div>

<style>
  button {
    background-color: red;
    border: none;
    outline: none;
    border-radius: 100%;
    display: block;
    height: 20px;
    width: 20px;
  }
  button.available {
    background-color: green;
  }
</style>