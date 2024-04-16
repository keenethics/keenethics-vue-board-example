<template>
  <div class="h-full flex flex-col container">
    <Header class="flex-none" @open:drawer="openDrawer" />
    <div class="flex-1 flex">
      <div class="py-9 px-5 bg-gray-50 rounded-t-2xl flex-1">
        <RequestState :is-loading="isPending" :error="error">
          <CardGrid v-if="data" :projects="data" @sort="handleSort" />
        </RequestState>
      </div>
      <InfoSidebar class="max-md:hidden flex-none" :projects="data" />
    </div>
  </div>
  <Drawer class="md:hidden" :is-open="isDrawerOpen" @close="closeDrawer">
    <InfoSidebar :projects="data" />
  </Drawer>
</template>

<script setup lang="ts">
import type { ChangeOrderPayload, Project } from '@/types/project';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import InfoSidebar from '@/components/layouts/InfoSidebar.vue';
import Drawer from '@/components/lib/Drawer.vue';
import Header from '@/components/layouts/Header.vue';
import RequestState from '@/components/layouts/RequestState.vue';
import CardGrid from '@/components/layouts/CardGrid.vue';
import { onSort } from '@/shared/sort';
import projectService from '@/api/project';
import useToggleState from '@/combosables/useToggleState';

const { data, isPending, error } = useQuery({
  queryKey: ['projects'],
  queryFn: projectService.getProjects.bind(projectService),
});

const queryClient = useQueryClient();
const { mutate: changeSort } = useMutation({
  mutationFn: projectService.changeProjectOrder.bind(projectService),
  onMutate: (payload: ChangeOrderPayload) => {
    queryClient.setQueryData(['projects'], (oldProjects: Project[]) => {
      const newProjects = onSort(oldProjects, payload);
      return newProjects;
    });
  },
});

const handleSort = (payload: ChangeOrderPayload): void => {
  changeSort(payload);
};

const [isDrawerOpen, openDrawer, closeDrawer] = useToggleState();
</script>
