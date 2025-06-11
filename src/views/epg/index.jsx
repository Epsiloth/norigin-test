'use client'

import { useState, useEffect, createRef } from 'react';
import axios from 'axios';
import EPGRow from '@/components/epg-row';
import ChannelLogo from '@/components/channel-column';
import styles from './styles.module.scss';

export default function EPGView() {
  // STATE & VARIABLE DECLARATIONS
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [channels, setChannels] = useState([]);
  const [focus, setFocus] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => { // ON COMPONENT MOUNT, FETCH DATA FROM THE MOCK API
    axios.get('http://localhost:1337/epg')
    .then(resp => {
      setData(resp.data?.channels);
    })
    .catch(err => {
      console.error(err);
    });
  }, []);

  useEffect(() => {  // RE-RENDER COMPONENTS ON ANY DATA, FOCUS OR TIME UPDATE
    console.log(data);
    renderChannels();
    renderRows();
    document.addEventListener('keydown', handleKeyPress); // LISTEN FOR USER INPUT

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date()) // UPDATE EPG TIME EVERY 5 SECONDS
    }, 5000);

    return () => {
      document.removeEventListener('keydown', handleKeyPress); // REFRESH EVENT LISTENER FOR STATE CHANGES
      clearInterval(timeInterval);
    };
  }, [data, focus, currentTime]);

  const renderChannels = () => {
    const channels = [];
    if (data.length > 0) {
      for(let i = 0; i < data.length; i++) {
        channels.push(<ChannelLogo key={i} id={i} dataProps={data[i]} isFocused={i === focus} />);
      }
    }
    setChannels(channels);
  }

  const renderRows = () => {
    const rows = [];
    if (data.length > 0) {
      for(let i = 0; i < data.length; i++) {
        rows.push(<EPGRow key={i} id={i} dataProps={data[i]} currentTime={currentTime} />);
      }
    }
    setRows(rows);
  };

  const handleKeyPress = (event) => { // HANDLE USER INPUT
    switch (event.keyCode) {
      case 38: // ARROW UP
        event.stopPropagation();
        event.preventDefault();
        goUp();
      break;
      
      case 40: // ARROW DOWN
        event.stopPropagation();
        event.preventDefault();
        goDown();
      break;
    }
  }

  const goUp = () => {
    const nRows = data.length;
    const rowHeight = parseInt(styles.epg_row_height);
    const appHeight = parseInt(styles.app_height);
    let startOfJumps = Infinity;

    if (nRows * rowHeight > appHeight) {
      startOfJumps = data.length - (Math.round(Math.round(nRows * rowHeight - appHeight)/rowHeight) + 1); // CALCULATE WHERE OFFSET SHOULD START APPLYING BASED ON NUMBER OF ROWS AND APP_HEIGHT
    }

    if (focus > 0) {
      setFocus(focus - 1)
      if (focus >= startOfJumps) {
        setOffsetHeight(offsetHeight - rowHeight);
      }
    };
  }

  const goDown = () => {
    const nRows = data.length;
    const rowHeight = parseInt(styles.epg_row_height);
    const appHeight = parseInt(styles.app_height);
    let startOfJumps = Infinity;

    if (nRows * rowHeight > appHeight) {
      startOfJumps = data.length - (Math.round(Math.round(nRows * rowHeight - appHeight)/rowHeight) + 1);
    }
  
    if (focus < data.length - 1) {
      setFocus(focus + 1);
      if (focus >= startOfJumps) {
        setOffsetHeight(offsetHeight + rowHeight);
      }
    }
  }

  return (
      <div className={styles.wrapper}>
        <div className={styles.movable_wrapper} style={{marginTop: `-${offsetHeight}px`}}>
          <div className={styles.channel_row}>
            {channels}
          </div>
          {rows}
        </div>
      </div>
  );
}
