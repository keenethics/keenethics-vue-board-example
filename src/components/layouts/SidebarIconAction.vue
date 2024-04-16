<template>
  <component
    :is="component"
    v-ripple
    class="p-3 cursor-pointer text-2xl transition-colors hover:bg-gray-100 rounded-lg flex"
  >
    <Icon :name="icon" />
  </component>
</template>

<script lang="ts" setup>
import Icon from '@/components/lib/Icon.vue';
import { IconName } from '@/types/ui';

withDefaults(
  defineProps<{
    icon: IconName;
    component?: 'button' | 'a';
  }>(),
  {
    component: 'button',
  },
);
</script>
