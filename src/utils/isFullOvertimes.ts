import { IBusinessDay } from "../shared/models/IBusinessDay";

export async function isFullOvertimes(date: Date) {
  const res: Response = await fetch(`https://apis.digital.gob.cl/fl/feriados/${date.getFullYear()}/${date.getMonth() + 1}`);
  const holidays: IBusinessDay[] = await res.json();
  const getHolidays = holidays.map(holiday => new Date(holiday.fecha).getDate() + 1);

  return (
    date.getDay() === 0 ||// Sunday
    getHolidays.includes(date.getDate()) === true
  )
    ? true
    : false;
};