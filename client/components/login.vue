<template>
  <div
    class="bg-white/90 p-8 rounded-lg shadow-lg border border-gray-200 max-w-md w-full hover:border-blue-400"
  >
    <h1 class="text-[#1e3a8a] text-center font-bold text-2xl">Heavenly Todo</h1>
    <form class="space-y-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel class="text-[#1e3a8a]">Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel class="text-[#1e3a8a]">Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-coral-600 text-white rounded hover:bg-coral-700 focus:outline-none"
      >
        {{ isLoading ? "Logging in..." : "Login" }}
      </button>
      <button @click="toggleView">Don't have an account? Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "@/components/ui/toast";
import * as zod from "zod";
const authStore = useAuthStore();
const isLoading = ref(false);

const formSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .min(1, { message: "This is required" })
      .email({ message: "Must be a valid email" }),
    password: zod
      .string()
      .min(1, { message: "This is required" })
      .min(8, { message: "Too short" }),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    const result = await authStore.login(values);
    if (result && result.success) {
      await navigateTo("/");
      toast({
        title: "Login Success",
        description: `Welcome ${result.user}`,
        duration: 1000,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: result.error,
      });
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Login Failed",
      description: "An unexpected error occurred. Please try again.",
    });
  } finally {
    isLoading.value = false;
  }
});

const props = defineProps<{
  toggleView: () => void;
}>();
</script>

<style scoped>
.bg-coral-600 {
  background-color: #ff6f61;
}
.hover\:bg-coral-700:hover {
  background-color: #ff6f61d9;
}
</style>
