<template>
  <div class="relative min-h-screen bg-container">
    <div>
      <Taskbar/>
      <slot/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>

<style scoped>
.bg-container {
  background-image: url("/background.gif");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.bg-container::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
}
</style>