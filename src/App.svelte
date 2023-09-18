<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import Map from "./lib/map/Map.svelte";
  import LogBox from "./lib/logBox/LogBox.svelte";
  import Info from "./lib/info/Info.svelte";
  import CRT from "./lib/crt/CRT.svelte";
  import {initalizeEventStore} from "./lib/event/store.js";

  initalizeEventStore()
</script>

<style>
  @import "./app.css";
</style>
<CRT></CRT>
