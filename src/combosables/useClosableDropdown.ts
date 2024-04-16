import type { Ref } from 'vue';
import { useClickOutside } from './useClickOutside';
import { useKeydown } from './useKeydown';

interface UseClosableDropdownOptions {
  isOpen: Ref<boolean>;
  close: () => void;
}
export default function useClosableDropdown({
  isOpen,
  close,
}: UseClosableDropdownOptions): { ref: Ref<HTMLElement | null> } {
  useKeydown({
    key: 'Escape',
    handler: close,
    when: isOpen,
  });

  const ref = useClickOutside({
    handler: close,
    when: isOpen,
  });

  return { ref };
}
