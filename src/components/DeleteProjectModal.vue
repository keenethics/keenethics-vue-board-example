<template>
  <AppModal
    :is-open="isOpen"
    :title="`Do you want to delete project ${name}`"
    @close="close"
  >
    <button @click="handleConfirm">{{ isPending ? 'Loading' : 'Yes' }}</button>
    <button @click="close">No</button>
    <span v-if="error">{{ error.message }}</span>
  </AppModal>
</template>

<script lang="ts" setup>
import projectService from '@/api/project';
import AppModal from '@/components/Modal.vue';
import { Project } from '@/types/project';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
const props = defineProps<{
  isOpen: boolean;
  name: string;
  id: string;
}>();
const emit = defineEmits(['close']);

const close = (): void => {
  emit('close');
};

const queryClient = useQueryClient();
const { isPending, error, mutate } = useMutation({
  mutationFn: projectService.deleteProject.bind(projectService),
  onSuccess(_, id: string) {
    queryClient.setQueryData(['projects'], (oldProjects: Project[]) => {
      return oldProjects.filter((project) => project.id !== id);
    });
    close();
  },
});
const handleConfirm = (): void => {
  mutate(props.id);
};
</script>
