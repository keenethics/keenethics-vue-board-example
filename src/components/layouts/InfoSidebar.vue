<template>
  <div class="pb-5 px-5 flex flex-col items-end pt-10">
    <div class="flex items-center pb-10 mb-10 border-b border-gray-100">
      <div>
        <h3 class="text-xl">
          Hello,<span class="font-bold block"> UserName</span>
        </h3>
      </div>
      <div class="flex items-center">
        <Avatar class="ml-4 bg-pink-400 p-3" size="medium">
          <img
            src="/images/default-avatar-male.svg"
            alt="Avatar"
            class="w-full"
          />
        </Avatar>
      </div>
    </div>
    <div v-if="projects" class="grid grid-cols-2 gap-x-2 gap-y-4 w-full">
      <StatsCard
        title="Projects"
        :value="projects.length.toString()"
        theme="purple"
      />
      <StatsCard title="Tasks" value="12" theme="green" />
      <StatsCard title="Completed" value="5" theme="orange" />
      <StatsCard title="Overdue" value="2" theme="red" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '@/types/project';
import Avatar from '@/components/lib/Avatar.vue';
import StatsCard from '@/components/layouts/StatsCard.vue';

defineProps<{
  projects?: Project[];
}>();
</script>
