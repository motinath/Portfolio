import { useState, useEffect } from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { FadeIn } from './ReusableComponents';

interface Movie {
  id: string;
  title: string;
  year: string;
  director: string;
  rating: string;
  liked: boolean;
  poster: string;
  letterboxdUrl: string;
}

const LetterboxdLogo = () => (
  <div className="flex -space-x-1.5 items-center select-none flex-shrink-0">
    <div className="w-3.5 h-3.5 rounded-full bg-[#ff8000]" />
    <div className="w-3.5 h-3.5 rounded-full bg-[#00e054]" />
    <div className="w-3.5 h-3.5 rounded-full bg-[#40bcf4]" />
  </div>
);

const FALLBACK_MOVIES: Movie[] = [
  {
    id: "fallback-1",
    title: "Interstellar",
    year: "2014",
    director: "Christopher Nolan",
    rating: "★★★★★",
    liked: true,
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80",
    letterboxdUrl: "https://letterboxd.com/film/interstellar/"
  },
  {
    id: "fallback-2",
    title: "Inception",
    year: "2010",
    director: "Christopher Nolan",
    rating: "★★★★½",
    liked: true,
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
    letterboxdUrl: "https://letterboxd.com/film/inception/"
  },
  {
    id: "fallback-3",
    title: "Whiplash",
    year: "2014",
    director: "Damien Chazelle",
    rating: "★★★★★",
    liked: true,
    poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
    letterboxdUrl: "https://letterboxd.com/film/whiplash/"
  },
  {
    id: "fallback-4",
    title: "La La Land",
    year: "2016",
    director: "Damien Chazelle",
    rating: "★★★★½",
    liked: true,
    poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80",
    letterboxdUrl: "https://letterboxd.com/film/la-la-land/"
  },
  {
    id: "fallback-5",
    title: "Parasite",
    year: "2019",
    director: "Bong Joon Ho",
    rating: "★★★★★",
    liked: true,
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=400&q=80",
    letterboxdUrl: "https://letterboxd.com/film/parasite-2019/"
  },
  {
    id: "fallback-6",
    title: "Blade Runner 2049",
    year: "2017",
    director: "Denis Villeneuve",
    rating: "★★★★★",
    liked: true,
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&q=80",
    letterboxdUrl: "https://letterboxd.com/film/blade-runner-2049/"
  },
  {
    id: "fallback-7",
    title: "Spirited Away",
    year: "2001",
    director: "Hayao Miyazaki",
    rating: "★★★★★",
    liked: false,
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80",
    letterboxdUrl: "https://letterboxd.com/film/spirited-away/"
  },
  {
    id: "fallback-8",
    title: "The Truman Show",
    year: "1998",
    director: "Peter Weir",
    rating: "★★★★½",
    liked: true,
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80",
    letterboxdUrl: "https://letterboxd.com/film/the-truman-show/"
  }
];

export function Movies() {
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchMovies = async () => {
      try {
        setLoading(true);
        // Using rss2json service to fetch & parse Letterboxd RSS feed cleanly (avoiding CORS and client-side XML parser bloat)
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://letterboxd.com/motinath_/rss/')}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch from RSS proxy');
        }
        const data = await response.json();

        if (data.status !== 'ok') {
          throw new Error(data.message || 'Invalid feed structure');
        }

        const parsedMovies: Movie[] = (data.items || []).map((item: any, idx: number) => {
          // Extract film details from the feed title: "Film Name, Year - ★★★★½"
          const match = item.title.match(/^(.*?),\s*(\d{4})(?:\s*-\s*(★+½?))?$/);
          const title = match ? match[1].trim() : item.title;
          const year = match ? match[2] : '';
          const rating = match && match[3] ? match[3] : '';

          // Heuristic: If rated 4 stars or higher, mark as liked (heart indicator)
          const liked = rating.includes('★★★★') || rating.includes('★★★★★');

          // Parse watch date from pubDate
          let watchDate = '';
          if (item.pubDate) {
            try {
              watchDate = new Date(item.pubDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });
            } catch (e) {
              watchDate = '';
            }
          }

          return {
            id: item.guid || `live-${idx}`,
            title,
            year,
            director: watchDate ? `Watched ${watchDate}` : '', // Show watch date dynamically
            rating: rating || 'Unrated',
            liked,
            poster: item.thumbnail || '',
            letterboxdUrl: item.link || 'https://letterboxd.com/motinath_/'
          };
        });

        if (isMounted) {
          if (parsedMovies.length > 0) {
            setMoviesList(parsedMovies);
            setIsFallback(false);
          } else {
            // Empty live feed, fall back to cached list
            setMoviesList(FALLBACK_MOVIES);
            setIsFallback(true);
          }
        }
      } catch (err) {
        console.error('Letterboxd RSS feed error, falling back to cached list:', err);
        if (isMounted) {
          setMoviesList(FALLBACK_MOVIES);
          setIsFallback(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMovies();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-full w-full bg-transparent text-[var(--vscode-text)] p-6 sm:p-10 md:p-16 flex flex-col font-sans select-none animate-fadeIn relative">

      {/* Starry blueprint backdrop */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 relative z-10">

        {/* Page Header */}
        <FadeIn delay={0.05} y={20} className="border-b border-[var(--vscode-border)] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 select-none">
              <span className="text-[var(--vscode-text-muted)] text-3xl font-extralight select-none">|</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--vscode-text)] tracking-tight uppercase">
                {isFallback ? 'Favorite Movies' : 'Watched Movies'}
              </h1>
            </div>
            <p className="text-xs text-[var(--vscode-text-muted)] font-sans font-medium">
              {isFallback
                ? 'A cached list of my favorite films, styled like Letterboxd (connection issue with live feed).'
                : 'My recently watched and rated films synced dynamically from my Letterboxd profile.'}
            </p>
          </div>

          {/* Letterboxd Profile Link Button */}
          <a
            href="https://letterboxd.com/motinath_/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[var(--vscode-tab-inactive-bg)]/80 hover:bg-[var(--vscode-tab-inactive-bg)] border border-[var(--vscode-border)] hover:border-[#007ACC]/50 text-xs font-semibold text-[var(--vscode-text)] transition-all select-none w-fit group"
          >
            <LetterboxdLogo />
            <span>Letterboxd ID: <strong className="text-[#ff8000] group-hover:underline">@motinath_</strong></span>
            <ExternalLink className="w-3 h-3 text-[var(--vscode-text-muted)] group-hover:text-[var(--vscode-text)]" />
          </a>
        </FadeIn>

        {/* Loading Skeleton Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-[2/3] animate-pulse rounded-xl border border-[var(--vscode-border)] bg-[var(--vscode-tab-inactive-bg)]/35 flex flex-col justify-between p-4"
              >
                <div className="flex justify-between items-start">
                  <div className="w-8 h-4 bg-[var(--vscode-border)]/50 rounded" />
                  <div className="w-4 h-4 bg-[var(--vscode-border)]/50 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="w-3/4 h-3 bg-[var(--vscode-border)]/50 rounded" />
                  <div className="w-1/2 h-2.5 bg-[var(--vscode-border)]/50 rounded" />
                  <div className="w-1/3 h-3 bg-[var(--vscode-border)]/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Movie Posters Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 animate-fadeIn">
            {moviesList.map((movie, idx) => (
              <FadeIn
                key={movie.id}
                delay={0.08 + idx * 0.04}
                y={25}
                className="group relative overflow-hidden rounded-xl border border-[var(--vscode-border)] hover:border-[#007ACC]/55 bg-[var(--vscode-tab-inactive-bg)]/35 transition-all duration-300 shadow-md hover:-translate-y-1 select-none"
              >
                <a
                  href={movie.letterboxdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[2/3] overflow-hidden cursor-pointer bg-[var(--vscode-tab-inactive-bg)]/50"
                >
                  {/* Poster Image */}
                  {movie.poster ? (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    /* Poster placeholder */
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--vscode-editor-bg)] text-xs text-[var(--vscode-text-muted)] p-4 text-center font-mono">
                      No Poster
                    </div>
                  )}

                  {/* Dark gradient shadow bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12]/95 via-[#0c0d12]/20 to-transparent" />

                  {/* Rating & Heart Overlays - Hover states */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0c0d12]/60 select-none">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono font-bold bg-[#ff8000]/10 text-[#ff8000] px-2 py-0.5 rounded border border-[#ff8000]/25">
                        {movie.year || 'N/A'}
                      </span>
                      {movie.liked && (
                        <Heart className="w-4 h-4 fill-[#ff8000] text-[#ff8000]" />
                      )}
                    </div>

                    <div className="text-left">
                      <h3 className="text-xs font-bold text-white tracking-wide truncate">{movie.title}</h3>
                      {movie.director && (
                        <p className="text-[10px] text-blue-400 font-medium truncate mt-0.5">{movie.director}</p>
                      )}
                      <div className="text-sm text-[#00e054] mt-1.5 font-sans leading-none select-none">
                        {movie.rating}
                      </div>
                    </div>
                  </div>

                  {/* Static details (shown if not hover) */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 group-hover:opacity-0 transition-opacity duration-300 text-left select-none pointer-events-none">
                    <h3 className="text-xs font-bold text-white truncate">{movie.title}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[11px] text-[#00e054] leading-none select-none">{movie.rating}</span>
                      {movie.liked && (
                        <Heart className="w-3 h-3 fill-[#ff8000] text-[#ff8000]" />
                      )}
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Movies;
