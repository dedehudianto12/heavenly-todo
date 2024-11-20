import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";
import type { task } from "../interface";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as task[],
  }),
  actions: {
    async fetchTasks() {
      try {
        const config = useRuntimeConfig();
        const baseUrl = config.public.apiBaseUrl;
        const authStore = useAuthStore();
        const token = authStore.token;

        if (!token) throw new Error("Access token not found");
        const data: { payload: task[] } = await $fetch(`${baseUrl}/task/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.tasks = data.payload;
        return { success: true };
      } catch (error: any) {
        const errorData = error.response._data;
        console.log(errorData);
      }
    },
  },
});
