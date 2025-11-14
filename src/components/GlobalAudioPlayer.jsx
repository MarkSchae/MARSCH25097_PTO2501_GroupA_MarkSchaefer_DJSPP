import { useState } from "react";

export default function GlobalAudioPlayer ({podcastAudio}) {
    console.log(podcastAudio);
    // Run this in useEffect later so that the audio part does not need to re-render for state changes to the player
    //setAudio(audio);
    //const [audioPlayer, setAudioPlayer] = useState((new Audio(podcastAudio)));
    const audioPlayer = new Audio(podcastAudio);
    console.log(audioPlayer);
    audioPlayer.play();
    const [playing, setPlay] = useState(true);
    
    return (
        <div>
            {/* Podcast player */}
            <div className="fixed bottom-0 left-0 w-full bg-gray-100 p-4 border-t border-gray-300 flex items-center justify-between z-50">
                {/* Podcast Info */}
                <div className="text-sm font-medium text-gray-700">
                    Chill Track
                </div>
                {/* Progress bar */}
                <div className="flex items-center space-x-2 w-1/2">
                    <span className="text-xs text-gray-500">0:00</span>
                    <div className="relative w-full h-2 bg-gray-300 rounded">
                    <div className="absolute top-0 left-0 h-2 w-1/3 bg-green-500 rounded"></div>
                    </div>
                    <span className="text-xs text-gray-500">3:45</span>
                </div>
                {/* Play/Pause Button */}
                <button 
                onClick={() => {
                    setPlay((playing ? false : true));
                    console.log(playing);
                    console.log(audioPlayer);
                    playing ? audioPlayer.pause() : audioPlayer.play();
                }}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">
                    {playing ? 'Pause' : 'Play'}
                </button>
            </div>

        </div>
    );
}