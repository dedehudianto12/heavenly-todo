import { defineStore } from "pinia";
import type { loginCredentials, loginPayload } from "../interface";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userId: "",
    name: "",
    token: "",
  }),
  actions: {
    async login(credentials: loginCredentials) {
      try {
        const config = useRuntimeConfig();
        const baseUrl = config.public.apiBaseUrl;
        const data: { payload: loginPayload } = await $fetch(
          `${baseUrl}/user/login`,
          {
            method: "POST",
            body: credentials,
          }
        );

        const { payload } = data;
        this.userId = payload.user.id;
        this.name = payload.user.name;
        this.token = payload.access_token;

        localStorage.setItem("token", this.token);

        return { success: true, user: this.name };
      } catch (error: any) {
        if (error.response) {
          const errorData = error.response._data;
          return {
            success: false,
            error: errorData.error || "Login failed",
          };
        }
        return {
          success: false,
          error: error instanceof Error ? error.message : "Login failed",
        };
      }
    },
    checkAuth() {
      if (process.client) {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
          this.token = token;
          return true;
        }
      }
      return false;
    },
    async logout() {
      this.token = "";
      (this.userId = ""), (this.name = "");
      localStorage.removeItem("token");
      navigateTo("/login");
    },
  },
});
