import dayjs from "dayjs";

export function formatDate(date: dayjs.Dayjs | null): string {
  return date ? date.format("YYYY-MM-DD") : "";
}
export function compareDates(a: dayjs.Dayjs, b: dayjs.Dayjs): number {
  if (a.isBefore(b)) return -1;
  if (a.isAfter(b)) return 1;
  return 0;
}
export function getTomorrow() {
  return dayjs().add(1, "day");
}
