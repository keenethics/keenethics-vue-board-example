<template>
  <header class="flex justify-between py-5 px-4">
    <h2 class="text-3xl font-bold">Projects</h2>
    <div class="hidden md:flex items-center">
      <Button theme="primary" @click="openCreateProjectModal">
        Create new project</Button
      >
      <ul class="flex gap-1 ml-20">
        <li>
          <ActionIconButton icon="search" />
        </li>
        <li>
          <ActionIconButton icon="bell" />
        </li>
      </ul>
    </div>
    <button
      v-ripple
      class="md:hidden text-xl flex p-2 rounded-md"
      @click="openDrawer"
    >
      <Icon name="burger" />
    </button>
    <CreateProjectModal
      :is-open="isCreateModalOpen"
      @close="closeCreateProjectModal"
    />
  </header>
</template>

<script setup lang="ts">
import CreateProjectModal from '@/components/projects/CreateProjectModal.vue';
import Button from '@/components/lib/Button.vue';
import Icon from '@/components/lib/Icon.vue';
import ActionIconButton from '@/components/layouts/ActionIconButton.vue';
import useToggleState from '@/combosables/useToggleState';

const [isCreateModalOpen, openCreateProjectModal, closeCreateProjectModal] =
  useToggleState();
const emit = defineEmits(['open:drawer']);
const openDrawer = (): void => emit('open:drawer');
</script>
