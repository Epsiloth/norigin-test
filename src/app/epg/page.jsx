'use client'

import { useState, useEffect, createRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import EPGRow from '@/components/epg-row';
import ChannelLogo from '@/components/channel-column';
import styles from './styles.module.scss';
import DateRow from '@/components/date-row';

export default function EPGView() {
  // STATE & VARIABLE DECLARATIONS
  const router = useRouter();
  let routerUrl = '';
  const defaultOffset = parseInt(styles.epg_row_height)/2;
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [channels, setChannels] = useState([]);
  const [focus, setFocus] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(defaultOffset);
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
    renderChannels();
    renderRows();
    document.addEventListener('keydown', handleKeyPress); // LISTEN FOR USER INPUT

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date()) // UPDATE EPG TIME EVERY MINUTE
    }, 60000);

    routerUrl = `/player?channel=${data[focus]?.id}`;
    return () => {
      document.removeEventListener('keydown', handleKeyPress); // REFRESH EVENT LISTENER FOR STATE CHANGES
      clearInterval(timeInterval);
    };

  }, [data, focus, currentTime]);

  const renderChannels = () => {
    const channels = [];
    if (data.length > 0) {
      for(let i = 0; i < data.length; i++) {
        channels.push(<ChannelLogo key={i} id={i} dataProps={data[i]} isFocused={i === focus} onClickFunction={onChannelSelect} />);
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

      case 13: // ENTER
        event.stopPropagation();
        event.preventDefault();
        onChannelSelect();
      break;
    }
  }

  const goUp = () => {
    if (focus > 0) {
      const nextElementRect = document.getElementById(`channel-${focus - 1}`).getBoundingClientRect();
      const rowHeight = parseInt(styles.epg_row_height);

      setFocus(focus - 1);

      if (nextElementRect.top - defaultOffset < defaultOffset) {
        focus - 1 > 0 ? setOffsetHeight(offsetHeight + rowHeight) : setOffsetHeight(defaultOffset);
      }
    };
  }

  const goDown = () => {
    if (focus < data.length - 1) {
      const nextElementRect = document.getElementById(`channel-${focus + 1}`).getBoundingClientRect();
      const appHeight = parseInt(styles.app_height);

      setFocus(focus + 1);

      if (nextElementRect.bottom > appHeight) {
        const offsetBottom = nextElementRect.bottom - appHeight;
        setOffsetHeight(offsetHeight - offsetBottom);
      }
    }
  }

  const onChannelSelect = (altId = undefined) => {
    if (altId && data[altId]) routerUrl = `/player?channel=${data[altId].id}`;
    router.push(routerUrl);
  }

  return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <DateRow id='date-row' currentTime={currentTime} />
        </div>
        <div className={styles.movable_wrapper} style={{top: `${offsetHeight}px`}}>
          <div className={styles.channel_row}>
            <div className={styles.channel_header} />
            {channels}
          </div>
          {rows}
        </div>
      </div>
  );
}