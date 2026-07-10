"use client"

import { Download, FileDown } from "lucide-react"
import { RefObject } from "react"
import LoadingCircle from "@/components/LoadingCircle"
import { useExport } from "../hooks/useExport"

interface DownloadButtonsProps {
  exportRef: RefObject<HTMLDivElement | null>
  slug: string
}

export default function DownloadButtons({ exportRef, slug }: DownloadButtonsProps) {
  const { downloadPng, downloadPdf, isExporting } = useExport(exportRef, slug)

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      <button
        onClick={downloadPng}
        disabled={isExporting}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#FFB347] px-4 py-3 text-sm font-semibold text-[#3D2B1F] transition-colors hover:bg-[#FFA020] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB347] focus-visible:ring-offset-2"
        aria-label="Tải thiệp mời dạng ảnh PNG"
      >
        {isExporting ? <LoadingCircle size="sm" /> : <Download size={16} />}
        Tải ảnh (PNG)
      </button>

      <button
        onClick={downloadPdf}
        disabled={isExporting}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-[#EDD5B8] bg-[#FFF8F2] px-4 py-3 text-sm font-semibold text-[#3D2B1F] transition-colors hover:bg-[#F5D5B0] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB347] focus-visible:ring-offset-2"
        aria-label="Tải thiệp mời dạng PDF"
      >
        {isExporting ? <LoadingCircle size="sm" /> : <FileDown size={16} />}
        Tải PDF
      </button>
    </div>
  )
}
