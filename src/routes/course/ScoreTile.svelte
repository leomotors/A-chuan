<script lang="ts">
  import type { Score } from "$lib/@types";
  import EditableSpan from "$lib/components/EditableSpan.svelte";
  import { r4 } from "$lib/utils";

  import styles from "./page.module.scss";

  export let score: Score;
</script>

<div class={styles.tile}>
  <p>{score.name}</p>
  <p>
    <EditableSpan
      text={r4(score.score) ?? "Not Ready"}
      onChange={(newValue) => {
        const parsed = +newValue;
        score.score = isNaN(parsed) ? undefined : parsed;
      }}
    /> / {score.fullScore}
  </p>
</div>
