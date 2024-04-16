<template>
  <div>
    <div v-if="isLoading" class="flex justify-center py-20 text-2xl">
      <Spinner />
    </div>
    <div v-else-if="error">{{ error.message }}</div>
    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
import Spinner from '@/components/lib/Spinner.vue';

interface Props {
  isLoading: boolean;
  error: Error | null;
}
defineProps<Props>();
</script>
