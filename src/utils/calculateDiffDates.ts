export function calculateDiffDates(date1: Date, date2: Date) {
  const ms: number = date2.getTime() - date1.getTime() ;
  const h: number = ms / 3.6e6;

  return h;
}