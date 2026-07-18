"use client"

import { useCountdown } from "../hooks/useCountdown"

export default function CountdownTimer() {
  const { days, hours, isPast } = useCountdown()

  if (isPast) {
    return (
      <p className="font-vietnam text-center text-base text-[#7A5C45]">
        Sự kiện đã diễn ra 🎓
      </p>
    )
  }

  return (
    <div className="flex gap-3 justify-center">
      <div className="bg-white border border-[#EDD5B8] rounded-md px-3 py-2 text-center shadow-sm min-w-[60px]">
        <div className="font-vietnam font-bold text-xl text-[#3D2B1F] leading-none tabular-nums">
          {String(days).padStart(2, "0")}
        </div>
        <div className="font-vietnam text-xs tracking-widest text-[#B08060] mt-1.5 uppercase">
          NGÀY
        </div>
      </div>
      <div className="bg-white border border-[#EDD5B8] rounded-md px-3 py-2 text-center shadow-sm min-w-[60px]">
        <div className="font-vietnam font-bold text-xl text-[#3D2B1F] leading-none tabular-nums">
          {String(hours).padStart(2, "0")}
        </div>
        <div className="font-vietnam text-xs tracking-widest text-[#B08060] mt-1.5 uppercase">
          GIỜ
        </div>
      </div>
    </div>
  )
}
