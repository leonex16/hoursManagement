import { EOvertime } from "./EOvertime";
import { EShift } from "./EShift";

export interface IHomeForm {
  overtimeType: EOvertime;
  overtimeQuant: number;
  checkIn: Date | number | null;
  checkOut: Date | number | null;
  shiftType: EShift;
  isFormValidated: boolean;
}