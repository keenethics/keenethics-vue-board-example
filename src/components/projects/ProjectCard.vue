<template>
  <div
    :class="{
      'px-5 py-3 border border-gray-100 rounded-lg shadow-sm cursor-move': true,
    }"
  >
    <div class="mb-8">
      <h3 class="text-lg font-bold mb-1">{{ project.name }}</h3>
      <p
        v-if="project.description"
        class="whitespace-pre-line text-xs text-gray-800"
      >
        {{ project.description }}
      </p>
    </div>
    <div class="mt-auto">
      <div class="flex gap-1">
        <Avatar src="/images/random-person.jpg" size="small" />
        <Avatar src="/images/random-person.jpg" size="small" />
      </div>
      <div class="flex justify-between mt-2 items-center">
        <span class="text-xs text-gray-400">{{
          createdAgo(project.createdAt)
        }}</span>
        <span data-draggable="false">
          <button class="text-2xl" @click="toggleFavouriteState">
            <Star :filled="project.isFavorite" />
          </button>
        </span>
      </div>
    </div>
    <DeleteProjectModal
      :id="project.id"
      :is-open="isDeleting"
      :name="project.name"
      @close="endDeleting"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Project } from '@/types/project';
import { toRefs } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import DeleteProjectModal from '@/components/projects/DeleteProjectModal.vue';
import Avatar from '@/components/lib/Avatar.vue';
import Star from '@/components/lib/Star.vue';
import useToggleState from '@/combosables/useToggleState';
import { createdAgo } from '@/utils/dates';
import projectService from '@/api/project';

const props = defineProps<{
  project: Project;
}>();
const { project } = toRefs(props);

const [isDeleting, endDeleting] = useToggleState();

const queryClient = useQueryClient();
const { mutate } = useMutation({
  mutationFn: (payload: { isFavorite: boolean }) => {
    return projectService.updateProject(project.value.id, payload);
  },
  onMutate: async (variables) => {
    await queryClient.cancelQueries({ queryKey: ['projects'] });
    const previousProjects = queryClient.getQueryData([
      'projects',
    ]) as Project[];
    queryClient.setQueryData(['projects'], (oldProjects: Project[]) => {
      return oldProjects.map((p) => {
        if (project.value.id === p.id) {
          return { ...p, ...variables };
        }
        return p;
      });
    });
    return { previousProjects };
  },
  onError: (_, __, context) => {
    if (context) {
      queryClient.setQueryData(['projects'], context.previousProjects);
    }
  },
});
const toggleFavouriteState = (): void => {
  mutate({ isFavorite: !project.value.isFavorite });
};
</script>
