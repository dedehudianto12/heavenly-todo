<template >
  <div
    v-if="authStore.isReady"
    class="w-full flex flex-row items-center bg-slate-950/40 shadow-lg border-b border-sky-200 justify-between py-2 px-4"
  >
    <div>
      <h1 class="text-2xl font-bold text-[#1e3a8a]">Heavenly Todo</h1>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as="div">
        <client-only>
          <Button variant="ghost" class="relative h-12  rounded-full p-0">
            <Avatar class="h-12 w-12">
              <AvatarImage src="/gojo1.jpg" alt="User avatar" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </client-only>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>Hello! ,{{ name }}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuLabel>Darkmode</DropdownMenuLabel>
        <DropdownMenuItem @click="handleLogout"> Logout </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const handleLogout = async () => {
authStore.logout();
};
const name = authStore.name;
console.log(name)
</script>

<style scoped>

</style>
