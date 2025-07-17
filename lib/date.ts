import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export type DayjsDate = dayjs.ConfigType;

/** Число дней в месяце для указанной даты */
export function daysInMonth(date: DayjsDate = Date.now()) {
  return dayjs(date).daysInMonth();
}

/** Продолжтельность в днях */
export function toDays(timestamp: number) {
  return dayjs.duration(timestamp).asDays();
}

/** Время в формате RFC-822 (Tue, 21 Apr 2015 14:15:00 +0300) */
export function toRFC822(date: DayjsDate) {
  return dayjs(date).format("ddd, DD MMM YYYY hh:mm:ss +0300");
}

/** Время в формате W3C Datetime (1997-07-16T19:20:30+03:00) */
export function toW3CDatetime(date: DayjsDate) {
  return dayjs(date).format("YYYY-MM-DDThh:mm:ss+03:00");
}
