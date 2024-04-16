<template>
  <Transition name="drawer-transition">
    <div v-if="isOpen" class="transition-all">
      <ModalBackdrop />
      <div
        ref="ref"
        class="bg-white rounded-l-lg p-4 fixed top-0 right-0 w-full max-w-72 transition-all h-full overflow-y-auto drawer--content"
      >
        <div class="p-4">
          <button class="text-xl flex" @click="close">
            <Icon name="times" />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import ModalBackdrop from '@/components/ModalBackdrop.vue';
import Icon from '@/components/Icon.vue';
import useClosableDropdown from '@/combosables/useClosableDropdown';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close']);
const close = (): void => {
  emit('close');
};

const { isOpen } = toRefs(props);
const { ref } = useClosableDropdown({ isOpen, close });
</script>

<style scoped>
.drawer-transition-enter-from,
.drawer-transition-leave-to {
  opacity: 0;
}
.drawer-transition-enter-from .drawer--content,
.drawer-transition-leave-to .drawer--content {
  transform: translateX(100%);
}
</style>
