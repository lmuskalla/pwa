export function formatDateTime(input: string) {
	const date = new Date(input),
		day = String(date.getDate()).padStart(2, '0'),
		month = String(date.getMonth() + 1).padStart(2, '0'),
		year = date.getFullYear(),
		hour = String(date.getHours()).padStart(2, '0'),
		minute = String(date.getMinutes()).padStart(2, '0');

	return `${day}.${month}.${year} ${hour}:${minute}`;
}

export function formatDate(input: string | Date) {
	const date = new Date(input),
		day = String(date.getDate()).padStart(2, '0'),
		month = String(date.getMonth() + 1).padStart(2, '0'),
		year = date.getFullYear();

	return `${day}.${month}.${year}`;
}

export function getUrlFormat(date: Date): string {
	const day = String(date.getDate()).padStart(2, '0'),
		month = String(date.getMonth() + 1).padStart(2, '0'),
		year = date.getFullYear();

	return `${year}-${month}-${day}`
}

export function getNextDay(date: Date): Date {
	date.setDate(date.getDate() + 1);
	return date;
}

export function getPrevDay(date: Date): Date {
	date.setDate(date.getDate() - 1);
	return date;
}

export function getLast30Days(): Array<Date> {
	const dates: Array<Date> = [];
	const today = new Date();

	dates.push(today);

	for (let i = 1; i < 30; i++) {
		let newDate = new Date();
		newDate.setDate(today.getDate() - i);
		dates.push(newDate);
	}

	return dates;
}

export function isDateToday(date: Date): boolean {
	const today = new Date();
	return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
}

export function isDateTomorrow(date: Date): boolean {
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	return date.getDate() === tomorrow.getDate() && date.getMonth() === tomorrow.getMonth() && date.getFullYear() === tomorrow.getFullYear();
}

export function isDateYesterday(date: Date): boolean {
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() - 1);
	return date.getDate() === tomorrow.getDate() && date.getMonth() === tomorrow.getMonth() && date.getFullYear() === tomorrow.getFullYear();
}

export function isDateThisWeek(date: Date): boolean {
	const today = new Date();
	const dayOfWeek = today.getDay();
	const dayOfWeekDate = new Date(today.setDate(today.getDate() - dayOfWeek));
	return date.getDate() === dayOfWeekDate.getDate() && date.getMonth() === dayOfWeekDate.getMonth() && date.getFullYear() === dayOfWeekDate.getFullYear();
}

export function isDateInThePast(date: Date): boolean {
	const today = new Date();
	return date < today;
}

export function isDateInTheFuture(date: Date): boolean {
	const today = new Date();
	return date > today;
}