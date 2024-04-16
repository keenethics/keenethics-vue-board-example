<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <TextField
      v-model="field"
      v-bind="fieldProps"
      label="Project Name"
      :error-message="errors.name"
    />
    <TextField
      v-model="descriptionField"
      v-bind="descriptionProps"
      label="Description"
      :error-message="errors.description"
    />
    <Button type="submit" size="sm" :disabled="isPending"
      >Create Project</Button
    >
    <span v-if="error">{{ error.message }}</span>
  </form>
</template>

<script lang="ts" setup>
import type { Project } from '@/types/project';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import TextField from '@/components/lib/TextField.vue';
import Button from '@/components/lib/Button.vue';
import projectService from '@/api/project';
import projectSchema, { type ProjectSchema } from '@/schemas/project.schema';

const queryClient = useQueryClient();

const emit = defineEmits(['submit']);
defineOptions({
  inheritAttrs: false,
});

const { isPending, error, mutate } = useMutation({
  mutationFn: projectService.createProject.bind(projectService),
  onSuccess(project: Project) {
    queryClient.setQueryData(['projects'], (oldProjects: Project[]) => {
      return [...oldProjects, project];
    });
    emit('submit');
  },
});

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(projectSchema),
});

const [field, fieldProps] = defineField('name');
const [descriptionField, descriptionProps] = defineField('description');

const onSubmit = handleSubmit((values: ProjectSchema) => {
  mutate(values);
});
</script>
