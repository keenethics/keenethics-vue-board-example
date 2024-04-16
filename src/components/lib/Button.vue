<template>
  <button v-ripple :class="buttonClasses">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
const { theme, size } = withDefaults(
  defineProps<{
    theme?: 'primary' | 'secondary' | 'success';
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    theme: 'primary',
    size: 'md',
  },
);
const buttonCVA = cva(['rounded-full', 'transition-all'], {
  variants: {
    theme: {
      primary: 'bg-purple-600 text-white hover:bg-purple-700',
      success: 'bg-green-600 text-white hover:bg-green-700',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    },
    size: {
      sm: 'py-2 px-4',
      md: 'py-3 px-5',
      lg: 'py-4 px-6',
    },
  },
});

const buttonClasses = computed(() =>
  buttonCVA({
    theme,
    size,
  }),
);
</script>
