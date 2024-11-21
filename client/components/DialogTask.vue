<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { toDate } from "radix-vue/date";
import { useForm } from "vee-validate";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { h } from "vue";
import * as z from "zod";

const taskStore = useTaskStore();

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(50),
    dueDate: z
      .string()
      .refine((v) => v, { message: "A date of birth is required." }),
    hour: z.number().int().min(0).max(23),
    minute: z.number().int().min(0).max(59),
  })
);

const maxDate = computed(() => {
  const todayDate = today(getLocalTimeZone());
  return todayDate.add({ months: 1 });
});

const value = computed({
  get: () => (values.dueDate ? parseDate(values.dueDate) : undefined),
  set: (val) => val,
});

const { handleSubmit, setFieldValue, values, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {
    hour: 12,
    minute: 30,
  },
});

const dialogOpen = ref(false);

const onSubmit = handleSubmit(async (values) => {
  try {
    const formattedDateTime = `${values.dueDate}T${values.hour.toString().padStart(2, "0")}:${values.minute.toString().padStart(2, "0")}`;
    const data = {
      title: values.title,
      dueDate: formattedDateTime,
    };
    const result = await taskStore.createTask(data);
    if (result && result.success) {
      toast({
        title: "Delete success",
        description: `Successfully delete a task`,
        duration: 1000,
      });
      dialogOpen.value = false;
    } else {
      toast({
        variant: "destructive",
        title: "Create Failed!!!",
        description: result.error,
      });
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Create Failed",
      description: "An unexpected error occurred. Please try again.",
    });
  }
});
</script>

<template>
  <Dialog :open="dialogOpen" @update:open="(val) => (dialogOpen = val)">
    <DialogTrigger as-child>
      <Button variant="ghost">
        <LucideListPlus :size="40" :stroke-width="3" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogDescription>Fixed the warning</DialogDescription>
      <DialogHeader>
        <DialogTitle>Add New Task</DialogTitle>
      </DialogHeader>

      <form id="dialogForm" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="dueDate">
          <FormItem class="flex flex-col mt-2">
            <FormLabel>Due Date</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    :class="
                      cn(
                        'w-[240px] ps-3 text-start font-normal',
                        !value && 'text-muted-foreground'
                      )
                    "
                  >
                    <span>{{
                      value ? df.format(toDate(value)) : "Pick a date"
                    }}</span>
                    <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                  </Button>
                  <input hidden />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar
                  v-bind="componentField"
                  v-model="value"
                  calendar-label="Date of birth"
                  initial-focus
                  :min-value="today(getLocalTimeZone())"
                  :max-value="maxDate"
                  @update:model-value="
                    (v) => {
                      if (v) {
                        setFieldValue('dueDate', v.toString());
                      } else {
                        setFieldValue('dueDate', undefined);
                      }
                    }
                  "
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex space-x-2 mt-2">
          <FormField v-slot="{ componentField }" name="hour">
            <FormItem class="flex-1">
              <FormLabel>Hour</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  max="23"
                  v-bind="componentField"
                  placeholder="HH"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="minute">
            <FormItem class="flex-1">
              <FormLabel>Minute</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  v-bind="componentField"
                  placeholder="MM"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </form>

      <DialogFooter>
        <Button type="submit" form="dialogForm"> Save changes </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
