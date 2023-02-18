<script lang="ts">
  import { appData } from "$lib/storage/localStorage";

  let dataText: string;
  $: dataText = JSON.stringify($appData, null, 2);
</script>

<main class="flex flex-col p-4 gap-4">
  <h1 class="font-bold text-3xl">Data Control Center</h1>
  <p>All your data in this website is saved in localStorage</p>

  <textarea
    class="border border-black rounded-lg p-1"
    rows="20"
    value={dataText}
    on:change={(e) => (dataText = e.currentTarget.value)}
  />

  <button
    class="w-fit p-2 border border-black rounded-lg hover:bg-slate-300 transition-colors"
    on:click={() => {
      $appData = JSON.parse(dataText);
    }}
  >
    Save Data
  </button>
</main>
