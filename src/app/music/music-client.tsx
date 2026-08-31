"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SpotifyLogo, Play, Disc } from "@phosphor-icons/react";

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumImage: string;
  spotifyUrl: string;
  popularity: number;
}

interface Artist {
  id: string;
  name: string;
  image: string | null;
  genres: string[];
  spotifyUrl: string;
}

interface NowPlaying {
  isPlaying: boolean;
  name: string;
  artist: string;
  album: string;
  albumImage: string;
  spotifyUrl: string;
}

export function MusicClient() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [loadingNowPlaying, setLoadingNowPlaying] = useState(true);
  const [loadingTop, setLoadingTop] = useState(true);

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const res = await fetch(
          "https://portfolio-backend-t7hl.onrender.com/api/spotify/now-playing"
        );
        if (res.ok) {
          const data = await res.json();
          if (data && data.isPlaying) {
            setNowPlaying(data);
          } else {
            // Fallback to last played from recently played
            const recentRes = await fetch(
              "https://portfolio-backend-t7hl.onrender.com/api/spotify/recent"
            );
            if (recentRes.ok) {
              const recentData = await recentRes.json();
              if (recentData && recentData.length > 0) {
                const last = recentData[0];
                setNowPlaying({
                  isPlaying: false,
                  name: last.name,
                  artist: last.artist,
                  album: last.album,
                  albumImage: last.albumImage,
                  spotifyUrl: last.spotifyUrl,
                });
              }
            }
          }
        }
      } catch (err) {
        console.error("Error fetching now playing:", err);
      } finally {
        setLoadingNowPlaying(false);
      }
    }

    async function fetchTopData() {
      try {
        const tracksPromise = fetch(
          "https://portfolio-backend-t7hl.onrender.com/api/spotify/top-tracks"
        ).then((r) => (r.ok ? r.json() : []));
        const artistsPromise = fetch(
          "https://portfolio-backend-t7hl.onrender.com/api/spotify/top-artists"
        ).then((r) => (r.ok ? r.json() : []));

        const [tracks, artists] = await Promise.all([tracksPromise, artistsPromise]);
        setTopTracks(tracks || []);
        setTopArtists(artists || []);
      } catch (err) {
        console.error("Error fetching top Spotify stats:", err);
      } finally {
        setLoadingTop(false);
      }
    }

    fetchNowPlaying();
    fetchTopData();

    // Poll currently playing track every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12">
      {/* Currently Playing / Last Played Section */}
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <SpotifyLogo className="size-6 text-[#1DB954]" weight="fill" />
        </div>

        <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-4">
          {nowPlaying?.isPlaying ? "Now Playing" : "Last Played"}
        </h2>

        {loadingNowPlaying ? (
          <div className="flex flex-col sm:flex-row gap-5 items-center animate-pulse">
            <div className="size-28 bg-muted rounded-xl flex-shrink-0" />
            <div className="space-y-3 flex-1 w-full text-center sm:text-left">
              <div className="h-5 bg-muted rounded w-2/3 mx-auto sm:mx-0" />
              <div className="h-4 bg-muted rounded w-1/2 mx-auto sm:mx-0" />
              <div className="h-3 bg-muted rounded w-1/3 mx-auto sm:mx-0" />
            </div>
          </div>
        ) : nowPlaying ? (
          <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
            {nowPlaying.albumImage ? (
              <a
                href={nowPlaying.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative size-28 rounded-xl overflow-hidden shadow-md flex-shrink-0 group block"
              >
                <Image
                  src={nowPlaying.albumImage}
                  alt={nowPlaying.album}
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Play className="size-8 text-white" weight="fill" />
                </div>
              </a>
            ) : (
              <div className="size-28 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <Disc className="size-12 text-secondary animate-spin" />
              </div>
            )}

            <div className="text-center sm:text-left flex-1 min-w-0">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                {nowPlaying.isPlaying && (
                  <span className="flex h-3 w-2 items-end gap-[2px] mb-0.5">
                    <span className="h-2 w-[2px] bg-emerald-500 rounded-full animate-[pulse_1s_infinite_100ms]" />
                    <span className="h-3.5 w-[2px] bg-emerald-500 rounded-full animate-[pulse_1s_infinite_300ms]" />
                    <span className="h-2.5 w-[2px] bg-emerald-500 rounded-full animate-[pulse_1s_infinite_500ms]" />
                  </span>
                )}
                <a
                  href={nowPlaying.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg sm:text-xl font-bold hover:text-[#1DB954] transition-colors truncate block"
                >
                  {nowPlaying.name}
                </a>
              </div>
              <p className="text-sm text-secondary truncate">{nowPlaying.artist}</p>
              <p className="mt-1 text-xs text-muted-foreground truncate">{nowPlaying.album}</p>

              <a
                href={nowPlaying.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black px-4 py-1.5 text-xs font-semibold shadow-sm transition-colors active:scale-95"
              >
                Listen on Spotify
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-secondary text-sm">
            No track playback records found.
          </div>
        )}
      </section>

      {/* Top Tracks & Artists Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {/* Top Tracks Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Top Tracks This Month
          </h2>

          {loadingTop ? (
            <div className="space-y-3 animate-pulse">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-4 h-4 bg-muted rounded" />
                  <div className="size-11 bg-muted rounded-lg" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : topTracks.length > 0 ? (
            <div className="divide-y divide-border/40">
              {topTracks.map((track, i) => (
                <div key={track.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                  <span className="font-mono text-sm text-secondary w-5 text-right font-medium">
                    {i + 1}
                  </span>

                  <a
                    href={track.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative size-11 rounded-md overflow-hidden flex-shrink-0 group block border border-border/50"
                  >
                    <Image
                      src={track.albumImage}
                      alt={track.album}
                      fill
                      sizes="44px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Play className="size-4 text-white" weight="fill" />
                    </div>
                  </a>

                  <div className="min-w-0 flex-1">
                    <a
                      href={track.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold leading-none hover:text-[#1DB954] transition-colors truncate block"
                    >
                      {track.name}
                    </a>
                    <span className="text-xs text-secondary mt-1 block truncate">
                      {track.artist}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-secondary text-sm py-4">No top tracks data found.</div>
          )}
        </section>

        {/* Top Artists Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Top Artists This Month
          </h2>

          {loadingTop ? (
            <div className="space-y-3 animate-pulse">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-5 h-4 bg-muted rounded" />
                  <div className="size-11 bg-muted rounded-full" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : topArtists.length > 0 ? (
            <div className="divide-y divide-border/40">
              {topArtists.map((artist, i) => (
                <div key={artist.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                  <span className="font-mono text-sm text-secondary w-5 text-right font-medium">
                    {i + 1}
                  </span>

                  <a
                    href={artist.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative size-11 rounded-full overflow-hidden flex-shrink-0 group block border border-border/50 shadow-sm"
                  >
                    {artist.image ? (
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        sizes="44px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="size-full bg-muted flex items-center justify-center">
                        <SpotifyLogo className="size-6 text-secondary" />
                      </div>
                    )}
                  </a>

                  <div className="min-w-0 flex-1">
                    <a
                      href={artist.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold leading-none hover:text-[#1DB954] transition-colors truncate block"
                    >
                      {artist.name}
                    </a>
                    <span className="text-[10px] text-secondary mt-1 block truncate capitalize">
                      {artist.genres.slice(0, 2).join(", ") || "Artist"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-secondary text-sm py-4">No top artists data found.</div>
          )}
        </section>
      </div>
    </div>
  );
}
