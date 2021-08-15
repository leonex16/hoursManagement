export function subtractOvertime(day: number, shift: number) {		
  if ( isSunday(day) === true ) return 0;
  
  return byShift(shift);
}

function byShift(shift: number): number {
  const hoursWorked: any = {
    // [shift]: hoursQuantity
    0: 7,
    1: 8,
    2: 8,
  };
  
  return hoursWorked[shift];
}

function isSunday(day: number): boolean {
  return day === 0 ? true : false;
}