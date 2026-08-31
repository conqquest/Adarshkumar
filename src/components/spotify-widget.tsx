"use client";

import { useEffect, useState } from "react";
import { SpotifyLogo } from "@phosphor-icons/react";

interface SpotifyTrack {
  isPlaying: boolean;
  name: string;
  artist: string;
  spotifyUrl: string;
}

export function SpotifyWidget() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpotify() {
      try {
        // Fetch now playing
        const nowPlayingRes = await fetch(
          "https://portfolio-backend-t7hl.onrender.com/api/spotify/now-playing"
        );
        if (nowPlayingRes.ok) {
          const nowPlayingData = await nowPlayingRes.json();
          if (nowPlayingData && nowPlayingData.isPlaying) {
            setTrack(nowPlayingData);
            setLoading(false);
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
            const lastTrack = recentData[0];
            setTrack({
              isPlaying: false,
              name: lastTrack.name,
              artist: lastTrack.artist,
              spotifyUrl: lastTrack.spotifyUrl,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch Spotify track:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSpotify();
    // Poll every 30 seconds to keep it fresh
    const interval = setInterval(fetchSpotify, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 font-mono text-xs text-secondary animate-pulse">
        <SpotifyLogo className="size-4" />
        <span>Connecting to Spotify...</span>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="flex items-center gap-2 font-mono text-xs text-secondary">
        <SpotifyLogo className="size-4" />
        <span>Not listening to anything</span>
      </div>
    );
  }

  return (
    <a
      href={track.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 font-mono text-xs text-secondary hover:text-foreground transition-colors group"
    >
      <SpotifyLogo 
        className={`size-4 transition-colors group-hover:text-[#1DB954] ${
          track.isPlaying ? "text-[#1DB954]" : "text-secondary"
        }`} 
        weight="fill" 
      />
      <div className="flex items-center gap-1.5 overflow-hidden">
        {track.isPlaying && (
          <span className="relative flex size-1.5 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
          </span>
        )}
        <span className="truncate max-w-[200px] sm:max-w-[300px]">
          {track.isPlaying ? "Now playing: " : "Last played: "}
          <span className="font-semibold text-foreground group-hover:underline">{track.name}</span>
          {" - "}
          <span>{track.artist}</span>
        </span>
      </div>
    </a>
  );
}
