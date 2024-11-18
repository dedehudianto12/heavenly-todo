<template>
  <div class="w-full h-screen flex justify-center items-center justify-center">
    <Login v-if="isLogin" :toggleView="toggleView" />
    <Register v-else :toggleView="toggleView" />
  </div>
</template>

<script lang="ts" setup>
const isLogin = ref(true);

definePageMeta({
  layout: false,
});

function toggleView() {
  isLogin.value = !isLogin.value;
}
</script>

<style scoped></style>
