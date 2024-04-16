<template>
  <div>
    <label class="block mb-2" :for="id">{{ label }}</label>
    <div class="relative">
      <input
        v-if="!isTextarea"
        :id="id"
        :value="modelValue"
        :class="inputClasses"
        :placeholder="placeholder"
        @input="handleInput"
      />
      <textarea
        v-else
        :id="id"
        :value="modelValue"
        :class="inputClasses"
        :placeholder="placeholder"
        @input="handleInput"
      ></textarea>
      <div v-if="errorMessage" class="text-red-500 text-xs mt-1">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label?: string;
  modelValue?: string;
  placeholder?: string;
  errorMessage?: string;
  isTextarea?: boolean;
}>();

const inputClasses = computed(() => [
  'border',
  'border-gray-300',
  'rounded',
  'py-2',
  'px-3',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-blue-500',
  'focus:border-blue-500',
  { 'h-20 resize-none': props.isTextarea },
]);

const emit = defineEmits(['update:value']);
const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  emit('update:value', target.value);
};

const id = `input-${Math.random().toString(36).substr(2, 9)}`;
</script>
