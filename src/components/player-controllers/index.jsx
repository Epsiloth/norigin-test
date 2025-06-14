import {useEffect, useState, useRef} from "react";
import { useRouter } from "next/navigation";
import styles from './styles.module.scss';

export default function PlayerController ({ playerRef, channelData }) {
    const [focus, setFocus] = useState('play');
    const [show, setShow] = useState(true);
    const [playing, setPlaying] = useState(false);
    const router = useRouter();
    const showTimeout = useRef(null);

    // REGISTER FOCUSABLE ELEMENTS AND THEIR POSITION AMONG EACH OTHER
    const focusMap = {
        "play": ['', '', '', 'back'], // [{ELEMENTID_UP}, {ELEMENTID_RIGHT}, {ELEMENTID_DOWN}, {ELEMENTID_LEFT}]
        "back": ['', 'play', '', '']
    };

    useEffect(() => {
        setFocus('play');
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('onmousemove', resetTimer);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('onmousemove', resetTimer);
        }
    }, [focus])

    useEffect(() => {
        if(playing) {
            if (show)
                resetTimer(show);
        } else {
            setShow(true);
            clearTimeout(showTimeout.current);
        }
        return () => {
            clearTimeout(showTimeout.current);
        }
    }, [playing, show])

    const play = () => {
        if (!playing) {
            setPlaying(true);   
            playerRef.current.play();
        } else {
            setPlaying(false);
            playerRef.current.pause();
        }
    }

    const back = () => {
        router.back();
    }

    const handleButton = () => {
        const button = document.getElementById(focus);
        button.click();
    }

    const handleKeyPress = (event) => { // HANDLE USER INPUT
        resetTimer();
        switch (event.keyCode) {
            case 39: // ARROW RIGHT
                event.stopPropagation();
                event.preventDefault();
                goRight();
            break;
            
            case 37: // ARROW LEFT
                event.stopPropagation();
                event.preventDefault();
                goLeft();
            break;

            case 13: // ENTER
                event.stopPropagation();
                event.preventDefault();
                handleButton();
            break;

            case 8: // RETURN
                event.stopPropagation();
                event.preventDefault();
                back();
            break;
        }
    }

    const resetTimer = (show = true) => {
        setShow(show);
        clearTimeout(showTimeout.current);
        showTimeout.current = setTimeout(() => {
            console.log('timer');
            setShow(false);
        }, 3000);
    }

    const goRight = () => {
        if (focusMap[focus][1])
            setFocus(focusMap[focus][1]);
    }

    const goLeft = () => {
        if (focusMap[focus][3])
            setFocus(focusMap[focus][3]);
    }


    
    return(
        <div id="player-ui" className={`${styles.ui_wrapper}${show ? '' : ` ${styles.hidden}`}`}>
            <div id="channel-title" className={styles.ui_title}>{channelData?.title ? `${channelData?.title} Channel` : ''}</div>
            <div className={styles.controller_wrapper} >
                <div id="back" className={`${styles.button}${focus == 'back' ? ` ${styles.focus}` : ''}`} style={{left: `5%`}} onClick={back}>back</div>
                <div id="play" className={`${styles.button}${focus == 'play' ? ` ${styles.focus}` : ''}`} style={{left: `50%`}} onClick={play}>{playing ? 'pause' : 'play'}</div>
            </div>
        </div>
    )
}