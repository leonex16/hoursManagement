import { addMonths } from "./addMonths";
import { firestoreDateToDate } from "./firestoreDate";
import { getFirstBusinessDay } from "./getFirstBusinessDay";
import { getMonthName } from "./getMonthName";

import { ICheck, IDialHistory } from "../shared/models/IDialHistory";
import { IPeriod } from "../shared/models/IPeriod";


const periodInitial: Promise<IPeriod> = new Promise( res => res({}));

export function getPeriods(dialHistory: IDialHistory[]) {
  return dialHistory.reduce<Promise<IPeriod>>(async (prevValPromise, recordHours) => {
    const prevVal = await prevValPromise;
    const checkOut = firestoreDateToDate((recordHours.checkOut as ICheck).seconds);
    const businessDay = await getFirstBusinessDay(checkOut);
    const prevMonth = addMonths(businessDay, - 1);
    const currentMonth = addMonths(businessDay, 0);
    const nextMonth = addMonths(businessDay, +1);
    const prevYear = prevMonth.getFullYear();    
    const currentYear = currentMonth.getFullYear();
    const nextYear = nextMonth.getFullYear();    
    const prevMonthName = getMonthName(prevMonth);
    const currentMonthName = getMonthName(currentMonth);
    const nextMonthName = getMonthName(nextMonth);
    const key = businessDay.getDate() <= 19 
      ? `${prevMonth.getMonth()}_${prevMonthName}_${prevYear}_a_${currentMonthName}_${currentYear}`
      : `${currentMonth.getMonth()}_${currentMonthName}_${currentYear}_a_${nextMonthName}_${nextYear}`;

    prevVal.hasOwnProperty(key) === true
      ? (prevVal[key] as any[]).push(recordHours)
      : prevVal[key] = [recordHours];

    return prevVal;
  }, periodInitial)
}