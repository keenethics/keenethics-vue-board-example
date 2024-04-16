import { format } from 'timeago.js';

export const isToday = (date: Date | string | number): boolean => {
  const now = new Date();
  const dateToCheck = new Date(date);
  return now.toDateString() === dateToCheck.toDateString();
};

export const createdAgo = (date: Date | string | number): string => {
  const dateToCheck = new Date(date);
  if (isToday(dateToCheck)) {
    return 'Today';
  }
  return format(dateToCheck);
};
