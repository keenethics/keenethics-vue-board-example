import { onUnmounted, watch, type Ref } from 'vue';

interface UseKeydownOptions {
  key: string;
  handler: () => void;
  when: Ref<boolean>;
}
export function useKeydown({ key, handler, when }: UseKeydownOptions): void {
  const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === key) {
      handler();
    }
  };

  watch(
    when,
    (value) => {
      if (value) {
        window.addEventListener('keydown', handleKeydown);
      } else {
        window.removeEventListener('keydown', handleKeydown);
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
}
