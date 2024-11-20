<template>
  <div class="flex w-full h-full gap-4">
    <div class="basis-1/3">
      <Tasks />
    </div>
    <div class="basis-1/3">Kanan</div>
    <div class="basis-1/3">Paling kanan</div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
  layout: "default",
});
</script>

<style></style>
