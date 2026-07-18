"use client"

import { useRef } from "react"
import type { EventConfig } from "./constants"
import InviteCard from "./components/InviteCard"
import InviteCardExport from "./components/InviteCardExport"
import DownloadButtons from "./components/DownloadButtons"

interface InvitePageViewProps {
  event: EventConfig
  guest: string
}

export default function InvitePageView({ event, guest }: InvitePageViewProps) {
  const exportRef = useRef<HTMLDivElement>(null)

  return (
    <main className="min-h-screen bg-[#FFEBD3] flex flex-col items-center justify-start py-8 px-4 gap-5">
      <InviteCard event={event} guest={guest} />

      <div className="flex gap-3 w-full max-w-sm mx-auto">
        <DownloadButtons exportRef={exportRef} slug={event.displayName} />
      </div>

      {/* Hidden export target — positioned off-screen for html-to-image capture */}
      <div
        aria-hidden="true"
        className="pointer-events-none"
        style={{ position: "absolute", left: -9999, top: 0 }}
      >
        <InviteCardExport ref={exportRef} event={event} guest={guest} />
      </div>
    </main>
  )
}
