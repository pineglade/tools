import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export { dayjs };

export type DayjsDate = dayjs.ConfigType;

/** Скорректировать время в меньшую сторону на число часовых поясов */
export function correctZone(date: DayjsDate, value = 3) {
	const result = dayjs(date).subtract(value, "h");

	if (date instanceof Date) {
		return result.toDate();
	}

	return result;
}

/** Число дней в месяце для указанной даты */
export function daysInMonth(date: DayjsDate = Date.now()) {
	return dayjs(date).daysInMonth();
}

/** Продолжтельность в днях */
export function toDays(timestamp: number) {
	return dayjs.duration(timestamp).asDays();
}

/** Время в формате RFC-822 (Tue, 21 Apr 2015 14:15:00 +0300) */
export function toRFC822(dateString: dayjs.ConfigType, zone = 3) {
	return dayjs(dateString).format(
		`ddd, DD MMM YYYY HH:mm:ss +${getPaddedZone(zone)}00`,
	);
}

/** Время в формате W3C Datetime (1997-07-16T19:20:30+03:00) */
export function toW3CDatetime(dateString: dayjs.ConfigType, zone = 3) {
	return dayjs(dateString).format(
		`YYYY-MM-DDTHH:mm:ss+${getPaddedZone(zone)}:00`,
	);
}

function getPaddedZone(zone: number) {
	return `${zone}`.padStart(2, "0");
}
