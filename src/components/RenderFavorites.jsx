import { map } from "lit/directives/map.js";
import React, { useState, useEffect } from "react";
import fetchData from "../api/fetch-data-api";


export default function RenderFavorites ({ podcastData, favMap, navigateFn, episodeTitleSetFn, trackSetFn }) {

    
    const [showId, setShowId] = useState();
    const [show, setShow] = useState({});
    const [season, setSeason] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState(null);



    useEffect(() => {
        console.log(showId)
        fetchData(`${showId}`).then(data => {
            const showData = data;
            setShow(showData);
/*             const currentSeason = show.seasons?.find(s => s.season === season);
            console.log(currentSeason);
            const episode = season.episodes?.find(episode => episode.title === currentEpisode);
            const e = currentSeason.episodes?.find(episode => episode.title === currentEpisode); 
            console.log(episode); 
            console.log(currentEpisode); 
            console.log(e); */
        });
    },[showId]);

    return ( 
        <div className='flex flex-col gap-4 bg-gray-200 p-4 w-full'>
            <div className='flex flex-col gap-5 sm:grid sm:grid-cols-2 xl:flex flex-col'>
            {podcastData.map(podcast => (
                <div className='flex flex-col gap-4 p-3.5 bg-white rounded-2xl transition-transform duration-200 hover:-translate-y-1 hover:cursor-pointer hover:shadow-2xl shadow-gray-500'
                key={podcast.id}
                /* onClick={() => navigateFn(podcast)} */>
                <img className="w-20 h-20 rounded-2xl bg-gray-300 border-2 border-gray-600" src={podcast.image} alt={podcast.title} />
                <div> {podcast.title} </div>
                <div> Seasons: {podcast.seasons} </div>
                <div className='flex flex-row justify-between'>
                    {podcast.genreNames.map(genreName => (<div key={genreName} className='bg-gray-300 rounded shadow shadow-black p-1'>{genreName}</div>))}
                </div>
                <div> {podcast.updatedReadable} </div>
                {Array.from(favMap.entries()).filter(([episodeTitle, valueSet]) => valueSet.has(podcast.id)).map(([episodeTitle, valueSet]) => {
                    const seasonNumber = Array.from(valueSet).filter(val => val !== podcast.id);
                return (
                    <div className="flex flex-row justify-between bg-amber-400 rounded-2xl p-2">
                        <button 
                        onClick={() => {
                            setShowId(podcast.id);
                            episodeTitleSetFn(episodeTitle);
                            console.log(show.title);
                            console.log(show.seasons.find(season => season.season === seasonNumber[0]).episodes.find(episode => episode.title === episodeTitle).file);
                            //console.log(episodeTitle);
                            trackSetFn(show.seasons.find(season => season.season === seasonNumber[0]).episodes.find(episode => episode.title === episodeTitle).file);
                            //console.log(episode.file);
                            setSeason(seasonNumber[0]);
                            setCurrentEpisode(episodeTitle);
                        }}
                        className='w-fit px-4 py-2 bg-gray-800 text-white rounded-2xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg'
                        >
                            Play
                        </button>
                        <div>{episodeTitle}</div>
                        <div>{seasonNumber}</div>
                    </div>

                )})
                }
                </div> 
                
            ))}
            </div>
        </div>
  );
}