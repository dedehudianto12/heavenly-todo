<template>
  <div class="auth h-screen">
    <Taskbar />
    <slot />
    <Toaster />
  </div>
</template>

<script lang="ts" setup></script>

<style>
.auth {
  background-image: url("/background.gif");
  background-size: cover;
  background-position: center;
}
</style>
