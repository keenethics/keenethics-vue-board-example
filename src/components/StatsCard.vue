<template>
  <div>
    <h4 class="text-xs font-medium text-gray-500 mb-1">{{ title }}</h4>
    <p
      class="text-4xl before:w-0.5 before:block flex items-stretch font-medium"
      :class="{
        'before:bg-purple-500': theme === 'purple',
        'before:bg-green-500': theme === 'green',
        'before:bg-orange-500': theme === 'orange',
        'before:bg-red-500': theme === 'red',
      }"
    >
      <span class="ml-3">{{ value }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
  theme?: 'purple' | 'green' | 'orange' | 'red';
}>();
</script>
