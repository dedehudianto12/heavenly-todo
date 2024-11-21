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
    async createTask(task: task) {
      try {
        const config = useRuntimeConfig();
        const baseUrl = config.public.apiBaseUrl;
        const authStore = useAuthStore();
        const token = authStore.token;

        if (!token) throw new Error("Access token not found");
        const data: { status: string; message: string; payload: task } =
          await $fetch(`${baseUrl}/task/`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: task,
          });

        this.tasks.push(data.payload);

        return { success: true };
      } catch (error: any) {
        if (error.response) {
          const errorData = error.response._data;
          return {
            success: false,
            error: errorData.error || "Failed to delete task",
          };
        }
        return {
          success: false,
          error:
            error instanceof Error ? error.message : "Failed to delete task",
        };
      }
    },
    async deleteTask(id: number) {
      try {
        const config = useRuntimeConfig();
        const baseUrl = config.public.apiBaseUrl;
        const authStore = useAuthStore();
        const token = authStore.token;
        if (!token) throw new Error("Access token not found");
        const data: { status: string; message: string } = await $fetch(
          `${baseUrl}/task/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.status != "Success") {
          throw new Error("Failed to delete task");
        }
        this.tasks = this.tasks.filter((task) => task.id != id);
        return { success: true };
      } catch (error: any) {
        if (error.response) {
          const errorData = error.response._data;
          return {
            success: false,
            error: errorData.error || "Failed to delete task",
          };
        }
        return {
          success: false,
          error:
            error instanceof Error ? error.message : "Failed to delete task",
        };
      }
    },
  },
});
