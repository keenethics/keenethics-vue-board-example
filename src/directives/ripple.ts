import { Directive } from 'vue';

interface RippleOptions {
  isEnabled: boolean;
}
type EventListeners = {
  mousedown?: (event: MouseEvent) => void;
  touchstart?: (event: TouchEvent) => void;
};
const listenersMap = new WeakMap<HTMLElement, EventListeners>();

const createRipple = (
  el: HTMLElement,
  { x, y }: { x: number; y: number },
): void => {
  const size = Math.max(el.clientWidth, el.clientHeight) * 2;

  const rippleSpan = document.createElement('span');

  rippleSpan.addEventListener('transitionend', () => {
    rippleSpan.remove();
  });

  rippleSpan.classList.add(
    'pointer-events-none',
    'transition-all',
    'block',
    'duration-700',
    'origin-center',
    'rounded-full',
    'absolute',
    'top-1/2',
    'left-1/2',
    '-translate-y-1/2',
    '-translate-x-1/2',
    'rounded-full',
    'opacity-30',
    'bg-[currentColor]',
    'scale-0',
  );

  const elRect = el.getBoundingClientRect();
  const left = x - elRect.left;
  const top = y - elRect.top;
  rippleSpan.style.left = `${left}px`;
  rippleSpan.style.top = `${top}px`;

  rippleSpan.style.width = `${size}px`;
  rippleSpan.style.height = `${size}px`;

  el.append(rippleSpan);

  setTimeout(() => {
    rippleSpan.classList.add('!scale-100');
    rippleSpan.classList.add('!opacity-0');
  });
};

const clearListeners = (el: HTMLElement): void => {
  const listeners = listenersMap.get(el);
  if (listeners) {
    if (listeners.mousedown) {
      el.removeEventListener('mousedown', listeners.mousedown);
    }
    if (listeners.touchstart) {
      el.removeEventListener('touchstart', listeners.touchstart);
    }
  }
};

const addListeners = (el: HTMLElement): void => {
  clearListeners(el);
  el.classList.add('relative', 'overflow-hidden');
  const onMouseDownEvent = (event: MouseEvent): void => {
    createRipple(el, {
      x: event.clientX,
      y: event.clientY,
    });
  };
  el.addEventListener('mousedown', onMouseDownEvent);

  const onTouchStartEvent = (event: TouchEvent): void => {
    createRipple(el, {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    });
  };
  el.addEventListener('touchstart', onTouchStartEvent);

  listenersMap.set(el, {
    mousedown: onMouseDownEvent,
    touchstart: onTouchStartEvent,
  });
};
const rippleDirective: Directive<HTMLElement, RippleOptions | undefined> = {
  mounted(el, binding) {
    const options = binding.value;
    if (options?.isEnabled !== false) {
      addListeners(el);
    }
  },
  updated(el, binding) {
    const options = binding.value;
    if (options?.isEnabled !== false) {
      addListeners(el);
    } else {
      clearListeners(el);
    }
  },
};

export default rippleDirective;
