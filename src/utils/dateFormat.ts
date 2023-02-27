import { endOfDay, format, startOfDay } from 'date-fns';

export const MINUTE_DURATION_MS = 60000;
export const currentLocationOffset = new Date().getTimezoneOffset();

export const isValidDate = (date: any) => {
	const newDate = new Date(date);

	return (date instanceof Date || newDate instanceof Date) && !isNaN(date);
};

export const formatDate = (date: Date | number, template = 'dd/MM/yyyy', options?: any) => {
		if (!isValidDate(date)) return 'Invalid Date';

		return format(date, template, options);
};

export const dateFormattingWithSlash = (date: any) => formatDate(date, 'dd/MM/yyyy hh:mm a');

export const startOfDayInMilliseconds = (date: number | Date) => startOfDay(date).getTime();

export const endOfDayInMilliseconds = (date: number | Date) => endOfDay(date).getTime();

export const convertLocalMsToUTCms = (localMilliseconds : number) => {
	if (!localMilliseconds) return null;
	return (localMilliseconds - currentLocationOffset * MINUTE_DURATION_MS);
};
