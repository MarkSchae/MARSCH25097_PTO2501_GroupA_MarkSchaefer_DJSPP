import { useRef, useEffect } from "react";

export default function Carousel({ podcastData, navigateFn }) {
  const trackRef = useRef(null);

  const scrollAmount = 270; 

  const scrollCarousel = (direction) => {
    const track = trackRef.current;
    if (track) {
      
      track.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex flex-col gap-4 bg-gray-200 p-4 container">
      {/* Scroll buttons */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-600 text-white rounded-full p-2 z-10 hover:bg-gray-800"
        onClick={() => scrollCarousel(-1)}
      >
        ‹
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-600 text-white rounded-full p-2 z-10 hover:bg-gray-800"
        onClick={() => scrollCarousel(1)}
      >
        ›
      </button>

      <div
        className='flex flex-row gap-5 overflow-x-scroll' 
        ref={trackRef}
        style={{ scrollbarWidth: "none" }} 
      >
        {podcastData.map((podcast) => (
          <div
            
            className='flex-shrink-0 w-16 flex flex-col gap-4 p-3.5 bg-white rounded-2xl h-full transition-transform duration-200 hover:-translate-y-1 hover:cursor-pointer hover:shadow-2xl shadow-gray-500 container'
            key={podcast.id}
            onClick={() => navigateFn(podcast)}
            style={{ minWidth: "250px" }} 
          >
            <img src={podcast.image} alt={podcast.title} className="rounded-xl" />
            <div className="flex-1 font-semibold">{podcast.title}</div>
            <div>Seasons: {podcast.seasons}</div>
            <div className="flex flex-row flex-wrap gap-1">
              {podcast.genreNames.map((genreName) => (
                <div
                  key={genreName}
                  className="bg-gray-300 rounded shadow shadow-black p-1 text-xs container"
                >
                  {genreName}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-500">{podcast.updatedReadable}</div>
          </div>
        ))}
      </div>
    </div>
  );
}