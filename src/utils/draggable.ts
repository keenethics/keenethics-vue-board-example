export const isPrevented = (element: HTMLElement): boolean => {
  let currentElem: HTMLElement | null = element;
  while (currentElem) {
    const isDraggable = currentElem.getAttribute('data-draggable');
    if (isDraggable === 'true') {
      return false;
    }
    if (isDraggable === 'false') {
      return true;
    }
    currentElem = currentElem.parentElement;
  }

  return false;
};
