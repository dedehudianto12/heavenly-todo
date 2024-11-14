<template>
  <div
    class="bg-white/90 p-8 rounded-lg shadow-lg border border-gray-200 max-w-md w-full hover:border-blue-400"
  >
    <h1 class="text-[#1e3a8a] text-center font-bold text-2xl">Heavenly Todo</h1>
    <form class="space-y-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel class="text-[#1e3a8a]">Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
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
        {{ isLoading ? "Logging in..." : "Register" }}
      </button>
      <button @click="toggleView">Don't have an account? Login</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "@/components/ui/toast";
import * as zod from "zod";
const authStore = useAuthStore();
const isLoading = ref(false);

const props = defineProps<{
  toggleView: () => void;
}>();

const formSchema = toTypedSchema(
  zod.object({
    name: zod
      .string()
      .min(1, { message: "This is required" })
      .min(6, { message: "Too short" }),
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
    const result = await authStore.register(values);
    if (result && result.success) {
      props.toggleView();
      toast({
        title: "Register Success",
        description: "Successfully Register",
        duration: 1000,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Register Failed",
        description: result.error,
      });
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Regsiter Failed",
      description: "An unexpected error occurred. Please try again.",
    });
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.bg-coral-600 {
  background-color: #ff6f61;
}
.hover\:bg-coral-700:hover {
  background-color: #ff6f61d9;
}
</style>
