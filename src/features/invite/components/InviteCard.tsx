"use client"

import { useState } from "react"
import { MapPin, MousePointerClick } from "lucide-react"
import { EVENT } from "../constants"
import CountdownTimer from "./CountdownTimer"

interface InviteCardProps {
  guestName: string
}

export default function InviteCard({ guestName }: InviteCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    /* perspective: no Tailwind utility → style is correct here */
    <div style={{ perspective: "1200px" }} className="w-full max-w-sm mx-auto">

      <div className={`card-flip-wrapper rounded-xl shadow-lg${isFlipped ? " is-flipped" : ""}`}>

        {/* ── FRONT FACE: invitation content ── */}
        <div className="card-face-front rounded-xl overflow-hidden bg-[#FFF8F2]">

          {/* TOP: image, fixed height */}
          <div className="relative w-full h-[220px]">
            {/* backgroundImage uses a JS template literal → style is correct here */}
            <div
              className="absolute inset-0 bg-cover"
              style={{
                backgroundImage: `url('${EVENT.bgImage}')`,
                backgroundPosition: "center 20%",
              }}
            />
            <div className="absolute inset-0 bg-black/20" />
            {/* gradient fade: linear-gradient has no Tailwind equivalent for a custom stop color */}
            <div
              className="absolute bottom-0 left-0 w-full h-14"
              style={{ background: "linear-gradient(to bottom, transparent, #FFF8F2)" }}
            />
            {/* school name pill */}
            <div className="absolute top-3 left-0 right-0 flex justify-center">
              <span className="font-vietnam text-white text-xs px-4 py-1 rounded-full bg-black/30 tracking-[0.12em]">
                TRƯỜNG ĐẠI HỌC SƯ PHẠM TP.HCM
              </span>
            </div>
          </div>

          {/* BOTTOM: text content */}
          <div className="bg-[#FFF8F2] px-6 pt-2 pb-6 flex flex-col items-center gap-3">

            <div className="text-center">
              <p className="font-vietnam text-xs text-[#B08060]">{EVENT.degree}</p>
              <p className="font-playfair font-bold text-xl text-[#3D2B1F] leading-snug">{EVENT.hostName}</p>
            </div>

            <div className="w-10 h-0.5 bg-[#FFB347]" />

            <div className="text-center">
              <p className="font-playfair italic text-sm text-[#7A5C45] mb-1">Xin trân trọng kính mời</p>
              <p className="font-playfair font-bold text-3xl text-[#3D2B1F] leading-tight border-b-2 border-[#FFB347] pb-1">
                {guestName}
              </p>
              <p className="font-vietnam text-sm text-[#7A5C45] mt-1">đến tham dự Lễ Tốt Nghiệp</p>
            </div>

            <p className="font-vietnam font-semibold text-sm text-[#3D2B1F] text-center">
              {EVENT.displayDatetime}
            </p>

            <div>
              <p className="font-vietnam text-xs text-[#B08060] text-center mb-2">Thời gian còn lại</p>
              <CountdownTimer />
            </div>

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

        {/* ── BACK FACE: hcmue.webp cover — click to flip ── */}
        <div
          className="card-face-back rounded-xl"
          onClick={() => setIsFlipped(true)}
          role="button"
          aria-label="Nhấn để mở thiệp mời"
        >
          {/* backgroundImage uses a JS template literal → style is correct here */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${EVENT.bgImage}')` }}
          />

          {/* Dark overlay — bg-black/55 */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Frosted dark pill with all text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-3 px-8 py-6 rounded-xl bg-black/45 backdrop-blur-md">

              <div className="w-10 h-px bg-[#FFB347]" />

              {/* textShadow has no Tailwind utility → style is correct here */}
              <p
                className="font-playfair italic text-xl text-center leading-snug font-bold text-[#FFB347]"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
              >
                Thiệp Mời
              </p>

              <p className="font-vietnam text-xs text-center uppercase text-[#EDD5B8] tracking-[0.18em]">
                Lễ Tốt Nghiệp
              </p>

              <div className="w-10 h-px bg-[#FFB347]" />

              <div className="flex flex-col items-center gap-1.5 mt-2">
                <MousePointerClick size={26} className="card-hint-icon text-[#FFB347]" />
                <p className="font-vietnam text-xs tracking-wide text-[#EDD5B8]">
                  Nhấn để mở thiệp
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
