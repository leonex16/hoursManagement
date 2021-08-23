export interface IDialHistory {
	overtimeQuant: number;
	shiftType: number;
	overtimeType: number;
	checkOut: Check | Date;
	checkIn: Check | Date;
}

export interface Check {
	seconds: number;
	nanoseconds: number;
}
