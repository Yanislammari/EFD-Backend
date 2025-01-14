export function getStartAndEndOfMonth() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11);
    const endOfYear = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate(), 11);

    return { startOfYear, endOfYear };
}

export function parseDate(date: Date): string {
    let monthParse;

    if (date.getMonth() < 10) {
        monthParse = '0' + (date.getMonth() + 1);
    } else {
        monthParse = date.getMonth() + 1;
    }

    let dayParse;

    if (date.getDate() < 10) {
        dayParse = '0' + date.getDate();
    } else {
        dayParse = date.getDate();
    }

    const res = date.getFullYear() + '-' + monthParse + '-' + dayParse;
    return res;
}

export function isDateInThePast(dateString: string): boolean {
    const targetDate = new Date(dateString);
    const targetDateWithoutTime = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1);
    const currentDate = new Date();
    return targetDateWithoutTime < currentDate;
}
