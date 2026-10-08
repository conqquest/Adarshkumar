"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import {
  VideoCamera,
  CalendarCheck,
  Clock,
  User,
  EnvelopeSimple,
  ChatText,
  ArrowUpRight,
  CheckCircle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const MEETING_TYPES = [
  {
    id: "quick",
    duration: "15 min",
    title: "Quick Chat",
    description: "Introductory call, quick question, or casual catch-up.",
    icon: Clock,
  },
  {
    id: "project",
    duration: "30 min",
    title: "Project Discussion",
    description: "Discussing new software projects, freelance work, or contracts.",
    icon: VideoCamera,
  },
  {
    id: "collaboration",
    duration: "45 min",
    title: "Technical Collaboration",
    description: "Architecture review, open source, or deep technical discussion.",
    icon: CalendarCheck,
  },
];

const TIME_SLOTS = [
  "10:00 AM IST",
  "02:00 PM IST",
  "05:00 PM IST",
  "07:30 PM IST",
  "09:00 PM IST",
];

export function ScheduleMeetingSection() {
  const [selectedType, setSelectedType] = useState(MEETING_TYPES[1]);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[1]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [scheduled, setScheduled] = useState(false);

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    // Create a pre-filled mailto with Google Meet request details
    const subject = encodeURIComponent(
      `Google Meet Request (${selectedType.duration}): ${selectedType.title} - ${name}`
    );
    const body = encodeURIComponent(
      `Hi Adarsh,\n\nI would like to schedule a ${selectedType.duration} Google Meet call with you.\n\n` +
        `• Name: ${name}\n` +
        `• Email: ${email}\n` +
        `• Topic: ${selectedType.title}\n` +
        `• Preferred Time: ${selectedSlot}\n` +
        `• Additional Note: ${note || "N/A"}\n\n` +
        `Please send me a Google Meet invite link. Thanks!`
    );

    window.open(`mailto:dev.adarshkumar07@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setScheduled(true);
  };

  return (
    <Container>
      <div className="space-y-6">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Google Meet 1-on-1
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Schedule a Meeting
            </h2>
            <p className="mt-1 text-sm text-secondary max-w-xl">
              Have a project in mind, want to discuss software & cloud architecture, or just connect?
              Pick a time slot and let&apos;s talk on Google Meet.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card/90 shadow-sm backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Meeting Type Selection */}
            <div className="border-b border-border p-6 lg:col-span-5 lg:border-b-0 lg:border-r space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">
                1. Select Meeting Type
              </h3>

              <div className="space-y-3">
                {MEETING_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-xs"
                          : "border-border/60 bg-background/50 hover:border-border hover:bg-muted/50"
                      )}
                    >
                      <div
                        className={cn(
                          "size-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-foreground">
                            {type.title}
                          </span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-border bg-muted/60 text-secondary">
                            {type.duration}
                          </span>
                        </div>
                        <p className="text-xs text-secondary mt-1 leading-relaxed line-clamp-2">
                          {type.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Google Meet Direct Action */}
              <div className="pt-2">
                <a
                  href="https://meet.google.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 hover:bg-muted p-3 text-xs font-medium text-foreground transition-colors"
                >
                  <VideoCamera className="size-4 text-emerald-500" weight="fill" />
                  <span>Instant Google Meet Room</span>
                  <ArrowUpRight className="size-3.5 text-secondary" />
                </a>
              </div>
            </div>

            {/* Right Column: Time Slot & Scheduling Form */}
            <div className="p-6 lg:col-span-7 space-y-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary mb-3">
                  2. Select Preferred Time Slot
                </h3>

                <div className="flex flex-wrap gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={cn(
                          "px-3.5 py-2 rounded-lg border text-xs font-mono transition-colors",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground font-semibold"
                            : "border-border bg-background hover:bg-muted text-secondary"
                        )}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form */}
              {scheduled ? (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center space-y-2 animate-in fade-in duration-300">
                  <div className="flex justify-center">
                    <CheckCircle className="size-10 text-emerald-500" weight="fill" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">
                    Google Meet Request Initialized!
                  </h4>
                  <p className="text-xs text-secondary max-w-md mx-auto">
                    An email draft with your requested meeting details (<strong>{selectedType.title}</strong> at <strong>{selectedSlot}</strong>) has been opened. Hit send and Adarsh will send back the Google Meet link!
                  </p>
                  <button
                    type="button"
                    onClick={() => setScheduled(false)}
                    className="mt-2 inline-flex text-xs font-semibold text-primary underline underline-offset-4"
                  >
                    Schedule another meeting
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSchedule} className="space-y-3.5 pt-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">
                    3. Your Contact Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <User className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div className="relative">
                      <EnvelopeSimple className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <ChatText className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <textarea
                      rows={2}
                      placeholder="Brief note or agenda (optional)..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 text-xs shadow-md transition-all active:scale-[0.99]"
                  >
                    <VideoCamera className="size-4" weight="fill" />
                    <span>Confirm & Schedule Google Meet ({selectedType.duration})</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
