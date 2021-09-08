export function getMonthName (date: Date) {
  const getMonthName = Intl.DateTimeFormat('es-CL', { month: 'long' });
  
  return getMonthName.format(date);
}