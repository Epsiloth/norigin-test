import {useEffect, useState} from "react";
import styles from './styles.module.scss';
import { checkTimeframe, formatToHourFromDate } from "@/helpers/helpers";

export default function EPGRow ({ id, dataProps, currentTime }) {
    const startingOffset = parseInt(styles.channel_column_width); // CHANNEL COLUMN WIDTH
    const [data, setData] = useState(dataProps);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        setData(dataProps);
        renderSchedule();
    }, [dataProps, currentTime]);

    const renderSchedule = () => {
        const array = [];
        for (let i = 0; i < data?.schedules.length; i++) {
            const startDate = new Date(data?.schedules[i].start);
            const endDate = new Date(data?.schedules[i].end);
            
            const isCurrent = checkTimeframe(startDate, endDate, currentTime);


            const scheduleWidth = ((Math.abs(endDate - startDate) / (1000 * 60))  * parseInt(styles.timeslot_distance)) / 60;

            array.push(
                <div key={`${data?.id}-${i}`} id={`${data?.id}-${i}`} className={`${styles.schedule_entry}${isCurrent ? ` ${styles.current}` : ''}`} style={{width: `${scheduleWidth}px`}}>
                    <div className={styles.title}>{data?.schedules[i].title}</div>
                    <div className={styles.duration}>{formatToHourFromDate(startDate)} - {formatToHourFromDate(endDate)}</div>
                </div>
            );
        }
        setSchedules(array);
    }
    
    return(
        <div id={`row-${id}`} className={styles.epg_row} style={{marginLeft: `${startingOffset}px`}}>
            {schedules}
        </div>
    )
}