<template>
  <Card>
    <CardHeader class="flex flex-row justify-between">
      <CardTitle>Tasks</CardTitle>
      <DialogTask />
    </CardHeader>
    <CardContent v-for="task in tasks" class="flex gap-4">
      <h3 class="capitalize">{{ task.title }}</h3>
      <NuxtTime
        data-testid="switchable"
        :datetime="task.dueDate"
        hour="2-digit"
        minute="2-digit"
        month="numeric"
        day="numeric"
      />
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
const locale = ref();
import { useTaskStore } from "@/stores/task";
import DialogTask from "./DialogTask.vue";

const taskStore = useTaskStore();

onMounted(async () => {
  await taskStore.fetchTasks();
});

const tasks = computed(() => taskStore.tasks);
</script>

<style></style>
