import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { formatToHour } from '@/helpers/helpers';

export default function DateRow ({ id, currentTime }) {
    const startingOffset = 150; // CHANNEL COLUMN WIDTH
    const [timeslots, setTimeslots] = useState([]);
    const [leftOffset, setLeftOffset] = useState(startingOffset);

    useEffect(() => {
        renderTimeslots();
    }, []);

    useEffect(() => {
        calcTimeOffset();
    }, [timeslots, currentTime]);

    const renderTimeslots = () => {
        const array = [];
        for (let i = 0; i < 24; i++) {
            array.push(<div key={i} id={`timeslot-${i}`} className={styles.timeslot}>{formatToHour(i)}</div>)
        }
        array.push(<div key={24} id={`timeslot-${24}`} className={styles.timeslot}>{formatToHour(0)}</div>)

        setTimeslots(array);
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
        <div id={id} className={styles.date_row} style={{marginLeft: `${leftOffset}px`}}>
            {timeslots}
        </div>
    )
}