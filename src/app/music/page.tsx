import { Container } from "@/components/container";
import { MusicClient } from "./music-client";
import { createPageMetadata, pageTitle } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: pageTitle("Music"),
  description:
    "What Adarsh Kumar is listening to. Currently playing tracks, recently played music, and top artists.",
  path: "/music",
});

export default function MusicPage() {
  return (
    <div className="pb-16 pt-8">
      <Container className="max-w-5xl space-y-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Music</h1>
          <p className="mt-3 max-w-xl text-secondary">
            Here&apos;s a look into my Spotify playlists. You can see what I&apos;m listening
            to right now (updated in real-time) and my most played tracks and artists this month.
          </p>
        </div>

        <MusicClient />
      </Container>
    </div>
  );
}
