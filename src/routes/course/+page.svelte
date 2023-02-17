<script lang="ts">
  import { page } from "$app/stores";
  import { appData } from "$lib/storage/localStorage";
  import { r4 } from "$lib/utils";

  import { computeScore } from "./computeScore";
  import ScoreTile from "./ScoreTile.svelte";

  $: courseId = $page.url.searchParams.get("courseId");
  $: courseData = $appData.courses.find(
    (course) => course.courseId === courseId
  );

  function saveData() {
    $appData = $appData;
  }

  $: ({ totalScore, achievable } = computeScore(courseData));
</script>

{#if courseData}
  <p>Course: {courseData.courseId} {courseData.name}</p>

  <button on:click={saveData}>Save Data</button>

  <p>Full Score : {courseData.fullScore}</p>
  <p>Score (Type+) : {r4(totalScore)}</p>
  <p>Score (Type-) : {r4(achievable)}</p>
  {#if achievable && "A" in courseData.grades && achievable - courseData.grades.A >= 0}
    <p>Border A : {r4(achievable - courseData.grades.A)}</p>
  {/if}

  <div class="flex flex-col bg-pink-100 rounded-xl p-2 gap-1">
    {#each courseData.scores as score}
      <ScoreTile bind:score />

      {#if score.children}
        <div class="flex flex-col bg-pink-200 rounded-xl p-1 gap-1">
          {#each score.children as subScore}
            <ScoreTile bind:score={subScore} />
          {/each}
        </div>
      {/if}
    {/each}
  </div>
{:else}
  <p>Adios</p>
{/if}
