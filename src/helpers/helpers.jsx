export const formatDigit = (n) => {
    if (n < 10) {
        return `0${n}`;
    }
    return n;
}

export const formatToHour = (n) => {
    return `${formatDigit(n)}:00`
}

export const formatToHourFromDate = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${formatDigit(hours)}:${formatDigit(minutes)}`;
}

export const formatDate = (date) => {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    return `${days[date.getDay()]}, ${formatDigit(date.getDate())}.${formatDigit(date.getMonth() + 1)}`;
}

export const checkTimeframe = (startTime, endTime, checkTime) => {  // DISREGARD DATE AND ONLY CHECK HOURS/MINNUTES FOR SCHEDULE (PROTOTYPING ONLY)
    const startHour = startTime.getHours();
    const startMinutes = startTime.getMinutes();
    const endHour = endTime.getHours();
    const endMinutes = endTime.getMinutes();
    const checkHour = checkTime.getHours();
    const checkMinutes = checkTime.getMinutes();

    if (checkHour >= startHour && checkHour <= endHour)
        if (checkHour === startHour && checkMinutes > startMinutes)
            return true;
        else if (checkHour === endHour && checkMinutes < endMinutes)
            return true;
        else if (checkHour === startHour || checkHour === endHour)
            return false;
        else
            return true;

    return false;
}