import {useState} from "react";
import styles from './styles.module.scss';
import placeholder from '../../../public/placeholder.png';

export default function ChannelLogo ({ id, dataProps, isFocused }) {
    const data = dataProps;
    const styling = isFocused ? `${styles.channel_element} ${styles.focus}` : styles.channel_element;
    
    return(
        <div id={`channel-${id}`} className={styling} >
            <div className={styles.focus_overlay} />
            <div className={styles.channel_image} style={{backgroundImage: `url("${placeholder.src}")`, backgroundSize: '50%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}/>
        </div>
    )
}