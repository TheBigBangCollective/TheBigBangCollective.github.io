import { format } from "date-fns";

export function formatDates(startDate, endDate) {
    const sameMonth =
        format(startDate, "MMMM") ===
        format(endDate, "MMMM");
    const displayFormat = sameMonth
        ? `${format(startDate, "d")} - ${format(endDate, "d MMMM")}`
        : `${format(startDate, "d MMMM")} - ${format(endDate, "d MMMM")}`;
    return displayFormat;
}
