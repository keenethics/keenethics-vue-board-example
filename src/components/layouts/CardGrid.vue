<template>
  <div
    ref="element"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    <ProjectCard
      v-for="project in sortedProjects"
      :key="project.id"
      data-draggable="true"
      :project="project"
      @select="selectedProjectId = project.id"
    />
    <SingleProject
      v-if="selectedProjectId"
      :id="selectedProjectId"
      @close="selectedProjectId = null"
    />
  </div>
</template>

<script setup lang="ts">
import {
  Sortable,
  Plugins,
  DraggableClassNames,
  SwapAnimationOptions,
} from '@shopify/draggable';
import type { ChangeOrderPayload, Project } from '@/types/project';
import SingleProject from '@/components/projects/SingleProject.vue';
import ProjectCard from '@/components/projects/ProjectCard.vue';
import { computed, onMounted, ref, toRefs } from 'vue';
import { isPrevented } from '@/utils/draggable';

const emit = defineEmits<{
  sort: [payload: ChangeOrderPayload];
}>();

const props = defineProps<{
  projects: Project[];
}>();
const { projects } = toRefs(props);

const sortedProjects = computed(() => {
  return projects.value.slice().sort((a, b) => a.order - b.order);
});

const element = ref<HTMLDivElement | null>(null);
onMounted(() => {
  if (element.value) {
    const sortable = new Sortable(element.value, {
      draggable: '[data-draggable=true]',
      mirror: {
        constrainDimensions: true,
      },
      classes: {
        mirror: '!shadow-2xl',
      } as Record<DraggableClassNames, string>,
      plugins: [Plugins.SortAnimation],
      swapAnimation: {
        duration: 200,
        easingFunction: 'ease-in-out',
      } as SwapAnimationOptions,
    });

    sortable.on('drag:start', (event) => {
      const currentTarget = event.originalEvent.target as HTMLElement;
      if (isPrevented(currentTarget)) {
        event.cancel();
      }
    });
    sortable.on('sortable:stop', (args) => {
      const fromProject = sortedProjects.value[args.oldIndex];
      const toProject = sortedProjects.value[args.newIndex];
      if (args.oldIndex !== args.newIndex && fromProject && toProject) {
        emit('sort', {
          from: fromProject.order,
          to: toProject.order,
          id: fromProject.id,
        });
      }
    });
  }
});

const selectedProjectId = ref<string | null>(null);
</script>
