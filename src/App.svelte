<script>
  import CRT from "./lib/crt/CRT.svelte";
  import {initalizeEventStore} from "./lib/event/store.js";

  initalizeEventStore()
</script>

<style>
  @import "./app.css";
</style>
<CRT></CRT>
