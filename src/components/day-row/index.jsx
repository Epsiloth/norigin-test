import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { formatDate } from '@/helpers/helpers';

export default function DayRow ({ id, currentTime }) {
    const [days, setDays] = useState([]);
    const paddingLimit = 10;
    const offset = (parseInt(styles.dayslot_distance) * paddingLimit) - parseInt(styles.app_width)/2;

    useEffect(() => {
        renderDays();
    }, []);

    const renderDays = () => {
        const array = [];
        for (let i = paddingLimit; i > 0; i--) {
            const dayOffset = (24*60*60*1000) * i;
            array.push(<div key={i} id={`dayslot-${i}`} className={styles.dayslot}>{formatDate(new Date(currentTime.getTime() - dayOffset))}</div>)
        }
        array.push(<div key={paddingLimit + 1} id={`dayslot-${paddingLimit + 1}`} className={`${styles.dayslot} ${styles.current}`}>{formatDate(currentTime)}</div>)
        for (let i = 1; i < paddingLimit; i++) {
            const dayOffset = (24*60*60*1000) * i;
            array.push(<div key={paddingLimit + 2 + i} id={`dayslot-${paddingLimit + 2 + i}`} className={styles.dayslot}>{formatDate(new Date(currentTime.getTime() + dayOffset))}</div>)
        }

        setDays(array);
    }
    
    return(
        <div id={id} className={styles.day_row} style={{left: `${-offset}px`}}>
            {days}
        </div>
    )
}