import { map } from "lit/directives/map.js";

export default function RenderFavorites ({ children, favMap }) {
    console.log(favMap);
    console.log(favMap.entries());
    for (const [key, value] of favMap.entries()) { // Entries returns a map iterator which contains a key and value pair inside a array for each entry
        
    }
    const data = children.props.podcastData;
    const podcasts = data.map(data => data.id);
    const vals = podcasts.map(podcast => Array.from(favMap.get(podcast)));
    console.log(vals);

    return (
        <div>
            {children}
            {console.log('hello')}
            {console.log(children.props.podcastData)}
            {console.log(podcasts)}
            {console.log(favMap.get(...podcasts))}
            {podcasts.map(podcastId => {
                const valArr = Array.from(favMap.get(podcastId))
                return valArr.map(val => (<div>{val}</div>));
            })}
        </div>
    );
}