"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { lastPlayedTrack } from "@/config/spotify";

function VinylDisc({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="relative size-12 shrink-0">
      <div 
        className={`absolute inset-0 rounded-full vinyl-disc group-hover:animate-vinyl-spin ${
          isPlaying ? "animate-vinyl-spin" : ""
        }`} 
      />
      <div className="absolute inset-[26%] rounded-full bg-neutral-800 ring-1 ring-black/60" />
      <div className="absolute left-1/2 top-1/2 z-10 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-300 shadow-sm ring-1 ring-neutral-400/80" />
    </div>
  );
}

interface SpotifyTrack {
  isPlaying: boolean;
  name: string;
  artist: string;
  album: string;
  albumImage: string;
  spotifyUrl: string;
}

export function SpotifyLastPlayed() {
  const [track, setTrack] = useState<SpotifyTrack>({
    isPlaying: false,
    name: lastPlayedTrack.title,
    artist: lastPlayedTrack.artist,
    album: lastPlayedTrack.album,
    albumImage: lastPlayedTrack.albumArt,
    spotifyUrl: lastPlayedTrack.songUrl,
  });

  useEffect(() => {
    async function fetchPlayingStatus() {
      try {
        // Try now playing first
        const nowPlayingRes = await fetch(
          "https://portfolio-backend-t7hl.onrender.com/api/spotify/now-playing"
        );
        if (nowPlayingRes.ok) {
          const nowPlayingData = await nowPlayingRes.json();
          if (nowPlayingData && nowPlayingData.isPlaying) {
            setTrack({
              isPlaying: true,
              name: nowPlayingData.name,
              artist: nowPlayingData.artist,
              album: nowPlayingData.album,
              albumImage: nowPlayingData.albumImage || lastPlayedTrack.albumArt,
              spotifyUrl: nowPlayingData.spotifyUrl,
            });
            return;
          }
        }

        // Fallback to recently played
        const recentRes = await fetch(
          "https://portfolio-backend-t7hl.onrender.com/api/spotify/recent"
        );
        if (recentRes.ok) {
          const recentData = await recentRes.json();
          if (recentData && recentData.length > 0) {
            const last = recentData[0];
            setTrack({
              isPlaying: false,
              name: last.name,
              artist: last.artist,
              album: last.album,
              albumImage: last.albumImage || lastPlayedTrack.albumArt,
              spotifyUrl: last.spotifyUrl,
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch current/recent Spotify track:", err);
      }
    }

    fetchPlayingStatus();
    // Poll every 30 seconds
    const interval = setInterval(fetchPlayingStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="group w-full max-w-xs">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card/80 p-2.5 shadow-sm backdrop-blur-sm">
        <div className="relative flex h-14 w-16 shrink-0 items-center">
          <div className="relative z-10 h-14 w-14 overflow-hidden rounded-[3px] shadow-[2px_2px_8px_rgba(0,0,0,0.18)] ring-1 ring-black/10">
            <Image
              src={track.albumImage}
              alt={`${track.album} cover`}
              fill
              sizes="56px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-linear-to-l from-black/25 to-transparent" />
          </div>

          <div className="absolute -right-0.5 top-1/2 z-0 -translate-y-1/2">
            <VinylDisc isPlaying={track.isPlaying} />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 text-[10px] text-secondary">
            {track.isPlaying ? (
              <>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-emerald-500 font-semibold">Now playing</span>
              </>
            ) : (
              <>
                <span className="size-1 rounded-full bg-secondary/60" />
                <span>Last played</span>
              </>
            )}
          </p>
          <Link
            href={track.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 block truncate text-xs font-semibold text-foreground hover:underline"
          >
            {track.name}
          </Link>
          <p className="truncate text-[10px] text-secondary">{track.artist}</p>
        </div>

        <Link
          href={track.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open in Spotify"
          className="shrink-0 text-[#1DB954] transition-opacity hover:opacity-80"
        >
          <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
