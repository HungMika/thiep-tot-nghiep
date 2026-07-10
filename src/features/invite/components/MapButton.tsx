"use client"

import { MapPin } from "lucide-react"
import { EVENT } from "../constants"

export default function MapButton() {
  return (
    <a
      href={EVENT.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FFB347] px-4 py-2 text-sm font-medium text-[#3D2B1F] transition-colors hover:bg-[#FFA020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB347] focus-visible:ring-offset-2"
      aria-label="Xem địa chỉ tổ chức lễ tốt nghiệp trên bản đồ"
    >
      <MapPin size={16} />
      Xem địa chỉ trên bản đồ
    </a>
  )
}
