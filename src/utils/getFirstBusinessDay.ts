import { IBusinessDay } from '../shared/models/IBusinessDay';

export async function getFirstBusinessDay(date: Date) {
  let isBusinessDay: boolean = false;
  const DAY: number = 1000 * 60 * 60 * 24;
  const res: Response = await fetch(`https://apis.digital.gob.cl/fl/feriados/${date.getFullYear()}/${date.getMonth() + 1}`);
  const holidays: IBusinessDay[] = await res.json();
  const getHolidays = holidays.map(holiday => new Date(holiday.fecha).getDate() + 1);

  while (isBusinessDay === false) {
    if (
      date.getDay() === 6 ||// Saturday
      date.getDay() === 0 ||// Sunday
      getHolidays.includes(date.getDate()) === true
    ) {
      date = new Date(date.getTime() + DAY);

      isBusinessDay = getHolidays.includes(date.getDate()) === true ? false : true;
    } else isBusinessDay = true;
  }

  return date;
}

