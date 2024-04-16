import { ref, onUnmounted, type Ref, watch } from 'vue';
interface UseClickOutsideOptions {
  when: Ref<boolean>;
  handler: () => void;
}
export function useClickOutside({
  when,
  handler,
}: UseClickOutsideOptions): Ref<HTMLElement | null> {
  const elementRef = ref<HTMLElement | null>(null);

  const handleClickOutside = (event: MouseEvent): void => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      handler();
    }
  };
  const eventOptions = {
    capture: true,
  };
  watch(
    when,
    (value) => {
      if (value) {
        document.addEventListener('click', handleClickOutside, eventOptions);
      } else {
        document.removeEventListener('click', handleClickOutside, eventOptions);
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside, eventOptions);
  });

  return elementRef;
}
