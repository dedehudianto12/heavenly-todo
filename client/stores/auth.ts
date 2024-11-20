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
    isReady: false,
    isInitialized: false,
  }),
  getters: {
    displayName: (state) => state.name || "Guest",
  },

  actions: {
    async init() {
      try {
        if (process.client) {
          const token = localStorage.getItem("token");
          const name = localStorage.getItem("name");
          if (!token || !name) {
            throw new Error("Missing auth data");
          }
          this.token = token;
          this.name = name;
        }
      } catch (error) {
        this.logout();
      } finally {
        this.isReady = true;
        this.isInitialized = true;
      }
    },
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
        this.isReady = true;

        localStorage.setItem("token", this.token);
        localStorage.setItem("name", this.name);

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
    logout() {
      this.token = "";
      (this.userId = ""), (this.name = ""), (this.isReady = false);
      if (process.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
      }

      navigateTo("/login");
    },
  },
});
