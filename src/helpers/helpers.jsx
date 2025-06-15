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

export const formatDate = (date) => {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    const dayLastDigit = date.getDate() % 10;

    let acc = 'th';
    switch (dayLastDigit) {
        case 1:
            acc = 'st';
            break;
        case 2:
            acc = 'nd';
            break;
        case 3:
            acc = 'rd';
    }

    return `${days[date.getDay()]}, ${date.getDate()}${acc} ${months[date.getMonth()]}`;
}