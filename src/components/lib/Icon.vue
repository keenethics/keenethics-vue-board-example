<template>
  <i class="pi" :class="iconClass"></i>
</template>

<script lang="ts" setup>
import { IconName } from '@/types/ui';
import { computed } from 'vue';

const renameMap: Partial<Record<IconName, string>> = {
  settings: 'cog',
  burger: 'bars',
};

const { name } = defineProps<{
  name: IconName;
}>();

const iconClass = computed(() => {
  return `pi-${renameMap[name] || name}`;
});
</script>
