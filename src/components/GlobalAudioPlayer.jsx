import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

export default function GlobalAudioPlayer ({ podcastAudio, episodeTitle, interacted, setInteracted }) {
    // Run this in useEffect later so that the audio part does not need to re-render for state changes to the player
    const audio = useRef(null);

    const [playing, setPlay] = useState(true);
    const [loading, setLoading] = useState(true); 
    console.log(loading);
    // useRef is a way to manipulate DOM elements without React blocking it and without useRef causing a re-render
    // useRef is basically a way to use imperitive js updates inside React for frequent changes to very few or one dom element
    // Looking at adding a event listner to track times etc for the playing progress bar (because the bar is custom css)
    useEffect (() => {
        console.log(audio);
        audio.current.currentTime = 0;
        audio.current.load();
        audio.current.addEventListener('loadedmetadata', () => {
            console.log('meta Run');
            audio.current.play();
            setPlay(true);
            console.log(audio);
            console.log('Meta loaded');
            setLoading(false); 
        }, { once:true })
    }, [episodeTitle]);

    function updateProgressBar (currentTime) {
        const bar = document.getElementById('current-time');
        const progressBar = document.getElementById('audio-progress-bar');
        bar.textContent = `${currentTime}`;  
        const percent = (currentTime / audio.current.duration) * 100;
        progressBar.style.width = `${percent}%`; 
    }

    return (
        <div id="global-audio-player">
        <button
          className={`${!interacted ? 'z-50 fixed inset-0 flex items-center justify-center px-4 py-2 bg-gray-400 text-white rounded transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg' : 'hidden'}`}
          onClick={() => {
            setInteracted(true);
            audio.current.play()}}>
          {`Continue playing?`} 
        </button>
            {/* Podcast player */}
            <audio 
            ref={audio} // This is the audio ref that points to the audio tag in the DOM so we can use the audio object
            src={podcastAudio}
            onTimeUpdate={() => updateProgressBar (Math.floor(audio.current.currentTime))}>
            </audio>
            {loading ? (<div></div>) : (
            <div className="fixed bottom-0 left-0 w-full bg-gray-100 p-4 border-t border-gray-300 flex items-center justify-between z-50">
                {/* Podcast Info */}
                <div className="text-sm font-medium text-gray-700">
                    {episodeTitle}
                </div>
                {/* Progress bar */}
                <div className="flex items-center space-x-2 w-1/2">
                    <span id="current-time" className="text-xs text-gray-500">
                        0s
                    </span>
                    <div className="relative w-full h-2 bg-gray-300 rounded">
                        <div id="audio-progress-bar" className="absolute top-0 left-0 h-2 bg-green-500 rounded transition-all duration-2000 ease-linear"></div>
                    </div>
                    <span className="text-xs text-gray-500">
                        {Math.floor(audio.current.duration)}s
                    </span>
                </div>
                {/* Play/Pause Button */}
                <button 
                onClick={() => {
                    setPlay((playing ? false : true));
                    playing ? audio.current.pause() : audio.current.play();
                }}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">
                    {playing ? 'Pause' : 'Play'}
                </button>
            </div>) }
        </div>
    );
}