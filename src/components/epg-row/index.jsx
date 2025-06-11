import {useState, useEffect} from "react";
import styles from './styles.module.scss';
import placeholder from '../../../public/placeholder.png';

export default function EPGRow ({ id, dataProps, currentTime }) {
    const [data, setData] = useState(dataProps);
    
    return(
        <div id={`row-${id}`} className={styles.epg_row}>
        </div>
    )
}