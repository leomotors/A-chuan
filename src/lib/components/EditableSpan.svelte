<script lang="ts">
  export let text: string;
  $: value = text;

  export let onChange: (newValue: string) => unknown;

  let editMode = false;
</script>

{#if editMode}
  <input
    type="text"
    bind:value
    on:keypress={(e) => {
      if (e.key === "Enter") {
        editMode = false;
        onChange(value);
      }
    }}
  />
{:else}
  <button on:click={() => (editMode = true)}>
    <span>{text}</span>
  </button>
{/if}
