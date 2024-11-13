export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  const publicRoutes = ["/login", "/forgot-password"];

  if (publicRoutes.includes(to.path)) {
    if (process.client && localStorage.getItem("token")) {
      return navigateTo("/");
    }
    return;
  }

  if (process.client) {
    const token = localStorage.getItem("token");

    if (!token) {
      return navigateTo("/login");
    }

    if (token && !authStore.token) {
      authStore.token = token;
    }
  }
});
