"use client"

import { MapPin } from "lucide-react"
import { EVENT } from "../constants"
import CountdownTimer from "./CountdownTimer"

interface InviteCardProps {
  guestName: string
}

export default function InviteCard({ guestName }: InviteCardProps) {
  return (
    <div className="w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-md bg-[#FFF8F2]">

      {/* TOP: image only, fixed height */}
      <div className="relative w-full" style={{ height: 220 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${EVENT.bgImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
          }}
        />
        {/* dark overlay so text is readable */}
        <div className="absolute inset-0 bg-black/20" />
        {/* fade bottom of image into cream */}
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{ height: 56, background: "linear-gradient(to bottom, transparent, #FFF8F2)" }}
        />
        {/* school name pill — top center */}
        <div className="absolute top-3 left-0 right-0 flex justify-center">
          <span
            className="font-vietnam text-white text-xs px-4 py-1 rounded-full"
            style={{ background: "rgba(0,0,0,0.32)", letterSpacing: "0.12em" }}
          >
            TRƯỜNG ĐẠI HỌC SƯ PHẠM TP.HCM
          </span>
        </div>
      </div>

      {/* BOTTOM: all text content, normal flow, solid cream */}
      <div className="bg-[#FFF8F2] px-6 pt-2 pb-6 flex flex-col items-center gap-3">

        {/* Host info */}
        <div className="text-center">
          <p className="font-vietnam text-xs text-[#B08060]">{EVENT.degree}</p>
          <p className="font-playfair font-bold text-xl text-[#3D2B1F] leading-snug">{EVENT.hostName}</p>
        </div>

        {/* Amber divider */}
        <div className="w-10 h-0.5 bg-[#FFB347]" />

        {/* Invite + guest name */}
        <div className="text-center">
          <p className="font-playfair italic text-sm text-[#7A5C45] mb-1">Xin trân trọng kính mời</p>
          <p className="font-playfair font-bold text-3xl text-[#3D2B1F] leading-tight border-b-2 border-[#FFB347] pb-1">
            {guestName}
          </p>
          <p className="font-vietnam text-sm text-[#7A5C45] mt-1">đến tham dự Lễ Tốt Nghiệp</p>
        </div>

        {/* Date/time — prominent */}
        <p className="font-vietnam font-semibold text-sm text-[#3D2B1F] text-center">
          {EVENT.displayDatetime}
        </p>

        {/* Countdown — 2 boxes only */}
        <div>
          <p className="font-vietnam text-xs text-[#B08060] text-center mb-2">Thời gian còn lại</p>
          <CountdownTimer />
        </div>

        {/* Address — always visible, clickable */}
        <a
          href={EVENT.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2 hover:opacity-75 transition-opacity"
        >
          <MapPin size={14} className="mt-0.5 shrink-0 text-[#FFB347]" />
          <span className="font-vietnam text-sm text-[#7A5C45] text-left">{EVENT.venue}</span>
        </a>

      </div>
    </div>
  )
}
