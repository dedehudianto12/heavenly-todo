<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as="div">
        <!-- Wrap button in client-only to prevent hydration mismatch -->
        <client-only>
          <Button variant="ghost" class="relative h-12 w-12 rounded-full p-0">
            <Avatar class="h-12 w-12">
              <AvatarImage src="/gojo1.jpg" alt="User avatar" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </client-only>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>{{ name }}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Darkmode</DropdownMenuItem>
        <DropdownMenuItem @click="handleLogout"> Logout </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const handleLogout = async () => {
  await authStore.logout();
};
const name = authStore.name;
</script>

<style></style>
