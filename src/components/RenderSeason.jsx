import { useState } from "react";
import GlobalAudioPlayer from "./GlobalAudioPlayer";
import { useNavigate } from "react-router-dom";

/**
 * RenderSeason component displays the details of a single season and its episodes.
 * It shows the season's image, title, number of episodes, and a placeholder for the release date.
 * Each episode is displayed with its image, title, episode number, and description.
 * 
 * @param {Object} props - Component props passed for rendering.
 * @param {Object} props.season - Specific season chosen for viewing
 * @param {string} props.season.image - URL of the season's cover image.
 * @param {string} props.season.title - Title of the season.
 * @param {Object[]} props.season.episodes - Array of episode objects in the season.
 * @param {string} props.season.episodes[].title - Episode title.
 * @param {string} props.season.episodes[].description - Episode description.
 * @param {number} props.season.episodes[].episode - Episode number.
 * 
 * @component
 * @returns {JSX.Element} A season card with its list of episodes.
 */
export default function RenderSeason ({ season, trackSetFn, episodeTitleSetFn, podcast }) {
    // If we need this to persist on reload, set useParams
    const navigate = useNavigate();

    // Use useParams to set the audio src file for page reload persist
    // Need a state for the audio player that sets its own object of values that control the audio player for persistance
    const [podcastAudio, setAudio] = useState();
    // Favorites state
    const [favorites, setFavorites] = useState(() => {
        const storage = localStorage.getItem('localStorageFavorites');
        if(storage) {
            return new Map(JSON.parse(storage));
        }
        return new Map();
    }); // Lazy initialization of a map for the fav - initialize with local storage
    
    // Function to save to local storage
    function localStorageFavorites (map) {
        const mapArr = Array.from(map.entries());
        localStorage.setItem('localStorageFavorites', JSON.stringify(mapArr));
    }
    console.log(podcast.id);
    console.log(season.season);
    console.log(season);
    function favorited (id, podcastId) {
        console.log(podcastId);
        setFavorites(prevMap => {
            const newMap = new Map(prevMap);
            if(newMap.has(id)) {
                newMap.delete(id);
            } else {
                newMap.set(id, podcastId);
            } // Save map to local storage
            localStorageFavorites(newMap);
            return newMap;
        });
    }
    console.log(favorites);
    //const [episodeTitle, setEpisodeTitle] = useState();
    // Now I need to get the useLocation and create a helper funciton to persist the search param in the url of any route if it exsists
    function setSearchParamsUrl (audioFile) {
        navigate(`?selected=${audioFile}`);
    } 

    return (
        <div className="flex flex-col gap-2.5 bg-white border-2 border-gray-400 p-4">
            <div className="flex flex-col sm:grid sm:grid-cols-[auto_1fr] gap-5">
                <img className="w-20 rounded-2xl" src={season.image} alt={season.title} />
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-2xl">{season.title}</h1>
                    <div>Description that i cant find {season.season}</div>
                    <div className="flex flex-row gap-2">
                        <div>{season.episodes.length}</div>
                        <div className="text-[10px] flex items-center opacity-50">⚫</div>
                        <div>Date added</div>
                    </div>
                </div>
            </div>
            {season.episodes.map(episode => 
            <div className="flex flex-col gap-2.5 bg-white" key={episode.title}>
                <div className="flex flex-col p-2 border-2 border-gray-500 bg-gray-400 rounded-2xl sm:grid sm:grid-cols-[auto_1fr] gap-5">
                    <img className="w-20 h-20 rounded-2xl bg-gray-300 border-2 border-gray-600" src={season.image} alt={episode.title} />
                    <div className="flex flex-col gap-5">
                        <div>Episode:{episode.episode} {episode.title}</div>
                        <div className="line-clamp-1">{episode.description}</div>  
                        <div className="flex flex-row justify-between">
                            <button 
                            className='w-fit px-4 py-2 bg-gray-800 text-white rounded-2xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg'
                            value={episode.file} 
                            key={episode.title}
                            onClick={(event) => {
                                setAudio(event.target.value)
                                //setEpisodeTitle(episode.title)
                                trackSetFn(episode.file)
                                episodeTitleSetFn(episode.title)
                                setSearchParamsUrl(episode.file)
                                console.log(episode.episode)}}>
                                Click to play audio 
                            </button>
                            <button
                            className={`${favorites.has(`${episode.title}`) ? 
                                'self-center bg-amber-400 w-fit h-fit p-2 text-white rounded-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg border-2 border-red-950'
                            : 'self-center bg-amber-50 w-fit h-fit p-2 text-white rounded-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg border-2 border-red-950'
                            }
                            `}
                            onClick={(event) => favorited(event.target.value, podcast.id)}
                            value={episode.title}
                            >
                            </button>
                        </div>                   
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
/**
 * Thinking
 * Set the map in the main render component
 * Pass the setter function down to render season
 * Set the main hook to the local store map
 * Function to filter podcasts by title, then navigate to favorites with filter
 * I just dont want everything running again when favoriting
 * Use the local storage duh
 */
