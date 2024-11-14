import { defineStore } from "pinia";
import type {
  loginCredentials,
  loginPayload,
  registerCredentials,
} from "../interface";

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
    async register(credentials: registerCredentials) {
      try {
        const config = useRuntimeConfig();
        const baseUrl = config.public.apiBaseUrl;
        await $fetch(`${baseUrl}/user/register`, {
          method: "POST",
          body: credentials,
        });

        return { success: true };
      } catch (error: any) {
        if (error.response) {
          const errorData = error.response._data;
          return {
            success: false,
            error: errorData.error || "Register Failed",
          };
        }
        return {
          success: false,
          error: error instanceof Error ? error.message : "Register failed",
        };
      }
    },
    checkAuth() {
      if (process.client) {
        const token = localStorage.getItem("token");
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
