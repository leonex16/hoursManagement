export function addMonths(date: Date, monthsToAdd: number) {
  const cloneDate = new Date(date.getTime());
  const currentMonth = cloneDate.getMonth();
  cloneDate.setMonth(currentMonth + monthsToAdd);

  return cloneDate;
}