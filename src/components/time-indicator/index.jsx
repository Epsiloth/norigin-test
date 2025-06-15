import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export default function TimeIndicator ({ id, currentTime }) {
    const startingOffset = parseInt(styles.channel_column_width); // CHANNEL COLUMN WIDTH
    const [leftOffset, setLeftOffset] = useState(startingOffset);

    useEffect(() => {
        calcTimeOffset();
    }, [currentTime]);

    const calcTimeOffset = () => {
        const currentHour = currentTime.getHours();
        const timeslotOffset = currentHour * parseInt(styles.timeslot_distance);
        const currentMinutes = currentTime.getMinutes();
        const additionalMinutesOffset = (currentMinutes * parseInt(styles.timeslot_distance)) / 60;

        const totalOffset = timeslotOffset + additionalMinutesOffset;

        setLeftOffset(startingOffset + totalOffset);
    };
    
    return(
        <div id={id} className={styles.time_indicator} style={{left: `${leftOffset}px`}} />
    )
}