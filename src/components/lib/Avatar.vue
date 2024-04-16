<template>
  <div
    class="rounded-full overflow-hidden flex items-center justify-center"
    :class="{
      'w-5 h-5': size === 'small',
      'w-20 h-20': size === 'medium',
      'w-40 h-40': size === 'large',
    }"
  >
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="w-full h-full object-cover"
    />
    <slot v-else></slot>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    src?: string;
    size?: 'small' | 'medium' | 'large';
  }>(),
  {
    size: 'medium',
    src: '',
  },
);
</script>
