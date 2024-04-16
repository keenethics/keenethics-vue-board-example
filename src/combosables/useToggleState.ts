import { ref } from 'vue';

export default function useToggleState(
  defaultValue: boolean = false,
): readonly [typeof isActive, typeof setOn, typeof setOff, typeof toggle] {
  const isActive = ref(defaultValue);

  const setOn = (): void => {
    isActive.value = true;
  };
  const setOff = (): void => {
    isActive.value = false;
  };
  const toggle = (): void => {
    isActive.value = !isActive.value;
  };

  return [isActive, setOn, setOff, toggle] as const;
}
