<template>
  <div><Button @click="handleLogout">Logout</Button></div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const handleLogout = async () => {
  await authStore.logout();
};
</script>

<style></style>
