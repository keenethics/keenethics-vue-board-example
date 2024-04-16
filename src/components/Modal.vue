<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden modal"
      >
        <ModalBackdrop />
        <div
          class="flex flex-col items-center relative overflow-hidden max-h-full modal--content"
        >
          <div ref="ref" class="flex-1 overflow-auto bg-white p-5 rounded-xl">
            <h4 class="text-xl text-center mb-4">{{ title }}</h4>
            <slot></slot>
          </div>
          <button
            class="flex-none mt-4 bg-white w-10 h-10 rounded-full flex justify-center items-center text-black modal--close"
            @click="close"
          >
            <Icon name="times" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import useClosableDropdown from '@/combosables/useClosableDropdown';
import Icon from '@/components/Icon.vue';
import ModalBackdrop from '@/components/ModalBackdrop.vue';

const props = defineProps<{
  isOpen: boolean;
  title?: string;
}>();

const emit = defineEmits(['close']);
const close = (): void => {
  emit('close');
};

const { isOpen } = toRefs(props);
const { ref } = useClosableDropdown({ isOpen, close });
</script>

<style scoped>
.modal {
  transition: opacity 0.2s ease;
}
.modal--content,
.modal--close {
  transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal--content,
.modal-leave-to .modal--content {
  transform: translateY(50px);
}
.modal-enter-from .modal--close,
.modal-leave-to .modal--close {
  transform: translateY(-50px);
}
</style>
