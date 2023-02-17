<script lang="ts">
  import { page } from "$app/stores";
  import { appData } from "$lib/storage/localStorage";

  $: courseId = $page.url.searchParams.get("courseId");
  $: courseData = $appData.courses.find((course) => course.name === courseId);
</script>

{#if courseData}
  <p>Course: {courseData.name} {courseData.courseId}</p>
{:else}
  <p>Adios</p>
{/if}
