import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { formatToHour } from '@/helpers/helpers';

export default function DateRow ({ id }) {
    const startingOffset = parseInt(styles.channel_column_width); // CHANNEL COLUMN WIDTH
    const [timeslots, setTimeslots] = useState([]);

    useEffect(() => {
        renderTimeslots();
    }, []);

    const renderTimeslots = () => {
        const array = [];
        for (let i = 0; i < 24; i++) {
            array.push(<div key={i} id={`timeslot-${i}`} className={styles.timeslot}>{formatToHour(i)}</div>)
        }

        setTimeslots(array);
    }
    
    return(
        <div id={id} className={styles.date_row} style={{marginLeft: `${startingOffset}px`}}>
            {timeslots}
        </div>
    )
}