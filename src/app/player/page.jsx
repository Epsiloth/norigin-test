'use client'

import { createRef, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from './styles.module.scss';
import axios from "axios";
import PlayerController from "@/components/player-controllers";

export default function PlayerView() {
    // STATE & VARIABLE DECLARATIONS
    const [channelData, setChannelData] = useState(undefined);
    const [stream, setStream] = useState(undefined);

    const playerRef = createRef();
    const channelId = useSearchParams().get('channel');
    const placeholderStream = 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' // PLACEHOLDER MP4 IN CASE THE API FAILS

    useEffect(() => {
        axios.get('http://localhost:1337/epg') // FIRST GET CHANNEL DETAILS
        .then(resp => {
            prepareChannelData(resp.data?.channels);
            axios.get(`http://localhost:1337/channel/${channelId}/stream`) // THEN ATTEMPT TO GET CHANNEL STREAM
            .then(str => {
                setStream(str.data?.streamUrl); // TENTATIVE API PARAMETERS
            })
            .catch(error => {
                console.error(error);
                setStream(placeholderStream);
            });
            })
        .catch(err => {
            console.error(err);
        });
    }, []);

    const prepareChannelData = (channels) => {
        const currentChannel = channels?.filter((channel) => channel.id === channelId);
        setChannelData(currentChannel?.[0]);
    }

    useEffect(() => {
        setUpPlayer(); // INITIALIZE/RESET PLAYER WHENEVER THE STREAM URL CHANGES
    }, [stream]);

    const setUpPlayer = () => {
        if (stream) {
            playerRef.current.src = stream;
        }
    }

    return (
        <div className={styles.player_view}>
            <video ref={playerRef} id="player"></video>
            <PlayerController playerRef={playerRef} channelData={channelData} />
        </div>
    );
}