<template>
  <div class="flex flex-row relative min-h-screen bg-container">
    <div class="basis-1/5 w-64 min-h-full p-6">
      <SideBar />
    </div>
    <div class="flex-auto p-6">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.bg-container {
  background-image: url("/background.gif");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}
</style>
