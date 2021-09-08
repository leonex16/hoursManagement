export interface IDialHistory {
	overtimeQuant: number;
	shiftType: number;
	overtimeType: number; // 50% = 0, 100% = 1
	checkOut: ICheck | Date;
	checkIn: ICheck | Date;
}

export interface ICheck {
	seconds: number;
	nanoseconds: number;
}
