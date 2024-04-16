<template>
  <div>
    <h3>Single card</h3>
    <p>Project id: {{ id }}</p>
    <p v-if="project">Project name: {{ project.name }}</p>
    <button @click="close">Close</button>
  </div>
</template>

<script lang="ts" setup>
// @TODO add UI
import { toRefs } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import projectService from '@/api/project';

const props = defineProps<{
  id: string;
}>();
const { id } = toRefs(props);
const emit = defineEmits(['close']);
const close = (): void => {
  emit('close');
};

const { data: project } = useQuery({
  queryKey: ['projects', id.value],
  queryFn: projectService.getProjectById.bind(projectService, id.value),
});
</script>
