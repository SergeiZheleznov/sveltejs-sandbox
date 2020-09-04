<script lang="ts">
  import dateFormat from 'dateformat';
  
  let time = new Date;
  let tick = true;

  setInterval(()=>{
    time = new Date;
    tick = !tick;
  }, 1000);
</script>

<span>{dateFormat(time, `HH`)}{@html tick ? ':' : '&nbsp;'}{dateFormat(time, `mm`)}</span>

<style>
  span {
    font-size: 1.8rem;
  }
</style>