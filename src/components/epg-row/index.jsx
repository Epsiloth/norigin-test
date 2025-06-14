import {useEffect, useState} from "react";
import styles from './styles.module.scss';
import { formatToHourFromDate } from "@/helpers/helpers";

export default function EPGRow ({ id, dataProps, currentTime }) {
    const startingOffset = 150; // CHANNEL COLUMN WIDTH
    const [data, setData] = useState(dataProps);
    const [schedules, setSchedules] = useState([]);
    const [leftOffset, setLeftOffset] = useState(0);

    useEffect(() => {
        setData(dataProps);
        renderSchedule();
        calcTimeOffset();
    }, [dataProps]);

    useEffect(() => {
        calcTimeOffset();
    }, [currentTime]);

    const renderSchedule = () => {
        const array = [];
        for (let i = 0; i < data?.schedules.length; i++) {
            const startDate = new Date(data?.schedules[i].start);
            const endDate = new Date(data?.schedules[i].end);

            const scheduleWidth = (Math.abs(endDate - startDate) / (1000 * 60))  * parseInt(styles.timeslot_distance) / 60;

            array.push(
                <div key={`${data?.id}-${i}`} id={`${data?.id}-${i}`} className={styles.schedule_entry} style={{width: `${scheduleWidth}px`}}>
                    <div className={styles.title}>{data?.schedules[i].title}</div>
                    <div className={styles.duration}>{formatToHourFromDate(startDate)} - {formatToHourFromDate(endDate)}</div>
                </div>
            );
        }
        setSchedules(array);
    }

    const calcTimeOffset = () => {
        const currentHour = currentTime.getHours();
        const timeslotOffset = currentHour * parseInt(styles.timeslot_distance);
        const currentMinutes = currentTime.getMinutes();
        const additionalMinutesOffset = (currentMinutes * parseInt(styles.timeslot_distance)) / 60;

        const totalOffset = timeslotOffset + additionalMinutesOffset;

        setLeftOffset(startingOffset - totalOffset);
    };
    
    return(
        <div id={`row-${id}`} className={styles.epg_row} style={{marginLeft: `${leftOffset}px`}}>
            {schedules}
        </div>
    )
}