import React, { useEffect, useReducer, useRef, useState } from 'react';
import { exampleData } from '../data/mockData';

interface SpotifyTrack {
  name: string;
  album: { images: { url: string }[] };
  artists: { name: string }[];
}

interface ContentListProps {
  category: string;
}

const initialVisibleCount = 10;

function visibleReducer(state: number, action: { type: 'LOAD_MORE' | 'RESET' }) {
  switch (action.type) {
    case 'LOAD_MORE':
      return state + 5;
    case 'RESET':
      return initialVisibleCount;
    default:
      return state;
  }
}

const ContentList: React.FC<ContentListProps> = ({ category }) => {
  const [items, setItems] = useState<SpotifyTrack[]>([]);
  const [error, setError] = useState<string | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, dispatch] = useReducer(visibleReducer, initialVisibleCount);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch(
          'https://spotify23.p.rapidapi.com/playlist_tracks/?id=37i9dQZF1DXcBWIGoYBM5M&offset=0&limit=50',
          {
            headers: {
              'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
              'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
          }
        );
        const data = await res.json();
        const tracks = data.items.map((item: any) => item.track);
        setItems([...tracks, ...exampleData]);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Spotify 차트 데이터를 불러오는 데 실패했습니다.');
      }
    };

    if (category === '차트') {
      fetchChart();
    } else {
      setItems(exampleData);
      setError(null);
    }
    dispatch({ type: 'RESET' });
  }, [category]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dispatch({ type: 'LOAD_MORE' });
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="p-4 bg-gray-50">
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {items.slice(0, visibleCount).map((track, i) => (
        <div
          key={i}
          className="flex items-center p-3 bg-white mb-3 rounded-xl shadow hover:shadow-md transition-all"
          role="group"
          aria-label={`콘텐츠 ${track.name}`}
        >
          <div className="w-12 h-12 aspect-square rounded-lg mr-4 bg-gray-200 flex-shrink-0 overflow-hidden">
            {track.album.images[0]?.url && (
              <img
                src={track.album.images[0].url}
                alt="album"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <p className="font-medium text-sm text-gray-800 truncate max-w-[260px]">{track.name}</p>
            <p className="text-gray-500 text-xs">{track.artists.map(a => a.name).join(', ')}</p>
          </div>
        </div>
      ))}
      {visibleCount < items.length && (
        <div className="text-center text-gray-400 text-xs py-2">Loading more...</div>
      )}
      <div ref={loaderRef} className="h-4"></div>
    </div>
  );
};

export default ContentList;
