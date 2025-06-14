export const formatToHour = (n) => {
    if (n < 10) {
        return `0${n}:00`;
    }
    return `${n}:00`;
}

export const formatToHourFromDate = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (hours < 10) {
        return `0${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    }
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}