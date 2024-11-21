<template>
  <Card>
    <CardHeader class="flex flex-row justify-between">
      <CardTitle>Tasks</CardTitle>
      <DialogTask />
    </CardHeader>
    <CardContent v-for="task in tasks" class="flex gap-4">
      <h3 class="basis-1/2 capitalize">{{ task.title }}</h3>
      <NuxtTime
        class="basis-1/4"
        data-testid="switchable"
        :datetime="task.dueDate"
        hour="2-digit"
        minute="2-digit"
        month="numeric"
        day="numeric"
      />
      <div class="">
        <LucideTrash v-if="task.id" @click="deleteTask(task.id)" />
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { useTaskStore } from "@/stores/task";
import DialogTask from "./DialogTask.vue";
import { toast } from "@/components/ui/toast";

const taskStore = useTaskStore();

onMounted(async () => {
  await taskStore.fetchTasks();
});

const deleteTask = async (id: number) => {
  const result = await taskStore.deleteTask(id);
  if (result && result.success) {
    toast({
      title: "Delete success",
      description: `Successfully delete a task`,
      duration: 1000,
    });
  } else {
    toast({
      variant: "destructive",
      title: "Delete Failed!!!",
      description: result.error,
    });
  }
};

const tasks = computed(() => taskStore.tasks);
</script>

<style></style>
