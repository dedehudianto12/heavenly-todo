<template>
  <div class="w-full flex flex-row border justify-between py-4">
    <div>Heavenly Todo</div>
    <div>
      <button class="bg-cyan" @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const handleLogout = async () => {
  await authStore.logout();
};
</script>

<style></style>
