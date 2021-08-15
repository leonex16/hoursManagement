export function addDays(dateStr: string | Date, days: number): Date {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  date.setHours(0, 0, 0, 0);

  return date;
}