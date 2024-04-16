<template>
  <AppModal :is-open="isOpen" title="Create new project" @close="close">
    <CreateProjectForm @submit="close" />
  </AppModal>
</template>

<script lang="ts" setup>
import AppModal from '@/components/Modal.vue';
import CreateProjectForm from '@/components/CreateProjectForm.vue';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close']);
const close = (): void => {
  emit('close');
};
</script>
