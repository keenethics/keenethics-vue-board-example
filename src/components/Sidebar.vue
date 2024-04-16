<template>
  <div class="py-6 px-2 md:p-6 flex-col flex items-center">
    <div class="logo">
      <RouterLink to="/">
        <img src="/logo.svg" class="w-12" alt="Logo" />
      </RouterLink>
    </div>
    <ul class="mt-10 flex flex-col gap-1">
      <li v-for="item in items" :key="item.icon">
        <SidebarIconAction :icon="item.icon" />
      </li>
    </ul>
    <ul class="mt-auto flex flex-col gap-1">
      <li>
        <SidebarIconAction icon="settings" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import SidebarIconAction from '@/components/SidebarIconAction.vue';

const items = [
  { icon: 'objects-column' },
  { icon: 'wave-pulse' },
  { icon: 'chart-bar' },
] as const;
</script>
