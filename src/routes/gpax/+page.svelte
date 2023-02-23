<script lang="ts">
  import { Grade } from "$lib/@types";
  import EditableSpan from "$lib/components/EditableSpan.svelte";
  import { appData } from "$lib/storage/localStorage";
  import { r4, r4t4 } from "$lib/utils";

  import { computeGpax } from "./computeGpax";

  $: gpax = $appData.gpax;

  function saveData() {
    $appData = $appData;
  }

  $: computed = computeGpax(gpax);
  $: maxAfCredits = gpax.totalCredits - computed.suCredits;

  // Form
  let newCourseId = "";
  let newCourseName = "";
  let newCourseCredits = 3;
  let newOutcome = "";

  function onSubmit() {
    if (Object.keys(Grade).includes(newOutcome) || newOutcome === "S") {
      gpax.courses = [
        ...gpax.courses,
        {
          courseId: newCourseId,
          name: newCourseName,
          credits: newCourseCredits,
          outcome: newOutcome as keyof typeof Grade,
        },
      ];
    }

    newCourseId = "";
    newCourseName = "";
    newCourseCredits = 3;
    newOutcome = "";
  }
</script>

<main class="flex flex-col gap-4 p-4">
  <p>
    Curriculum Course Credits : <EditableSpan
      text={gpax.totalCredits.toString()}
      onChange={(v) => {
        const value = parseInt(v);
        if (isNaN(value)) return;
        gpax.totalCredits = value;
      }}
    />
  </p>
  <p>Duplicate Credits : <i>not implemented</i></p>

  <button
    class="border border-black rounded-lg p-1 w-fit"
    on:click={() => saveData()}
  >
    Save Data
  </button>

  <div>
    <span>Course ID</span>
    <input type="text" bind:value={newCourseId} />
    <span>Course Name</span>
    <input type="text" bind:value={newCourseName} />
    <span>Course Credits</span>
    <input type="number" min="0" bind:value={newCourseCredits} />
    <span>Outcome</span>
    <input type="text" bind:value={newOutcome} />
    <button class="border border-black rounded-lg p-1" on:click={onSubmit}>
      Add Outcome
    </button>
  </div>

  <div class="flex flex-col">
    <p>Gained A-F Credits : {computed.afCredits}</p>
    <p>Gained S/U Credits : {computed.suCredits}</p>
    <br />
    <p>Current GPAX : {r4t4(computed.gpGained / computed.afCredits)}</p>
    <p>
      Maximum GPAX (at {maxAfCredits} A-F credits) : {r4t4(
        4 - computed.gpLost / maxAfCredits
      )}
    </p>
    <p>Grade Point (Type+) : {computed.gpGained} / {maxAfCredits * 4}</p>
    <p>Grade Point (Type-) : -{computed.gpLost}</p>
    <p>Border 3.9 : {r4(0.1 * maxAfCredits - computed.gpLost)}</p>
    <p>Border 3.8 : {r4(0.2 * maxAfCredits - computed.gpLost)}</p>
    <p>Border 1st Honor : {r4(0.4 * maxAfCredits - computed.gpLost)}</p>
    <p>Border 2nd Honor : {r4(0.75 * maxAfCredits - computed.gpLost)}</p>
  </div>

  <p>Courses</p>
  <div class="flex flex-col gap-2 p-2 border border-slate-500 rounded-lg">
    {#each gpax.courses as course}
      <p>
        {course.courseId}
        {course.name}
        {course.credits} credits {course.outcome}
      </p>
    {/each}

    {#if gpax.courses.length === 0}
      <p>No Course</p>
    {/if}
  </div>
</main>

<style lang="scss">
  input {
    @apply rounded-lg border border-black p-1;
  }
</style>
