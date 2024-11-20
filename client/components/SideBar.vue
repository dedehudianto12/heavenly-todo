<template>
  <div class="bg-white/80 shadow-lg h-full rounded-md">
    <div class="p-4">
      <h1 class="text-2xl font-bold text-yellow-600">Heavenly Todo</h1>
    </div>
    <nav class="flex flex-col h-[85%] mt-8">
      <ul>
        <li class="py-2 px-4 hover:bg-gray-200">
          <a href="#" class="flex items-center font-semibold gap-2">
            <LucideFolderGit2 />
            Dashboard
          </a>
        </li>
        <li class="py-2 px-4 hover:bg-gray-200">
          <a href="#" class="flex items-center font-semibold gap-2">
            <LucideCheckCheck />
            My Tasks
          </a>
        </li>
        <li class="py-2 px-4 hover:bg-gray-200">
          <a href="#" class="flex items-center font-semibold gap-2">
            <LucideBellRing />
            Notifications
          </a>
        </li>
        <li class="py-2 px-4 hover:bg-gray-200">
          <a href="#" class="flex items-center font-semibold gap-2">
            <LucideSettings />
            Settings
          </a>
        </li>
      </ul>

      <ul class="mt-auto">
        <li class="py-2 px-4 flex">
          <Avatar>
            <AvatarImage src="/gojo1.jpg" alt="profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <client-only>
            <template v-if="!authStore.isReady">
              <p class="pt-2 pl-2 font-semibold">Loading...</p>
            </template>
            <template v-else>
              <p class="pt-2 pl-2 font-semibold">
                {{ authStore.name || "Guest" }}
              </p>
            </template>
          </client-only>
        </li>
        <li class="py-2 px-4">
          <a
            href="#"
            class="flex items-center gap-4 font-semibold"
            @click="handleLogout"
          >
            <LucideLogOut :size="30" />
            Logout
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const name = computed(() => authStore.name);
const handleLogout = () => {
  authStore.logout();
};
</script>

<style scoped></style>
