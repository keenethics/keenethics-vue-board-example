interface Sortable {
  order: number;
}
export const updateRange = <T extends Sortable>(
  items: T[],
  { start, end, diff }: { start: number; end: number; diff: number },
): T[] => {
  const sortedItems = [...items];
  sortedItems
    .filter((p) => {
      const { order } = p;
      return order >= start && order <= end;
    })
    .forEach((p) => {
      p.order += diff;
    });
  return sortedItems;
};

export const onSort = <T extends Sortable>(
  items: T[],
  { from, to }: { from: number; to: number },
): T[] => {
  let newItems = items.map((item) => ({ ...item }));
  const target = newItems.find((p) => p.order === from);
  if (from > to) {
    newItems = updateRange(newItems, {
      start: to,
      end: from - 1,
      diff: 1,
    });
  } else if (from < to) {
    newItems = updateRange(newItems, {
      start: from,
      end: to,
      diff: 1,
    });
  }
  if (target) {
    target.order = to;
  }
  return newItems;
};
