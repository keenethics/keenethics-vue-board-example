<template>
  <div class="min-h-screen md:bg-purple-500 md:p-5 flex flex-col">
    <div class="flex-1 flex bg-white md:rounded-xl">
      <Sidebar class="flex-none" />
      <div class="flex-1">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '@/components/Sidebar.vue';
</script>
