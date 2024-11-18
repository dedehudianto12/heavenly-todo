<template>
  <div
    class="w-full flex flex-row items-center shadow-lg border-b border-slate-200 justify-between py-2 px-4"
  >
    <div>
      <h1 class="text-2xl font-bold text-[#1e3a8a]">Heavenly Todo</h1>
    </div>
    <DropdownUser />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.bg-coral-600 {
  background-color: #ff6f61;
}
.hover\:bg-coral-700:hover {
  background-color: #ff6f61d9;
}
</style>
