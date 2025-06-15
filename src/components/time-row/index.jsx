import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { formatToHour } from '@/helpers/helpers';

export default function TimeRow ({ id }) {
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
        <div id={id} className={styles.time_row}>
            {timeslots}
        </div>
    )
}