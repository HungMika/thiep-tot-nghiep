"use client"

import { useState, RefObject } from "react"
import { toPng } from "html-to-image"
import jsPDF from "jspdf"
import { toast } from "sonner"
import { checkRateLimit } from "../utils/rateLimit"
import { EXPORT_WIDTH, EXPORT_HEIGHT, PIXEL_RATIO } from "../utils/exportHelpers"

interface UseExportReturn {
  downloadPng: () => Promise<void>
  downloadPdf: () => Promise<void>
  isExporting: boolean
}

export function useExport(
  exportRef: RefObject<HTMLDivElement | null>,
  slug: string
): UseExportReturn {
  const [isExporting, setIsExporting] = useState(false)

  const downloadPng = async () => {
    if (!exportRef.current) return
    if (!checkRateLimit("png")) {
      toast.warning("Vui lòng chờ một chút trước khi tải tiếp.")
      return
    }
    const toastId = toast.loading("Đang tạo ảnh...")
    setIsExporting(true)
    try {
      const dataUrl = await toPng(exportRef.current, {
        pixelRatio: PIXEL_RATIO,
        cacheBust: true,
        quality: 1,
      })
      const link = document.createElement("a")
      link.download = `thiep-moi-${slug}.png`
      link.href = dataUrl
      link.click()
      toast.success("Tải ảnh thành công!", { id: toastId })
    } catch {
      toast.error("Không thể tạo ảnh. Vui lòng thử lại.", { id: toastId })
    } finally {
      setIsExporting(false)
    }
  }

  const downloadPdf = async () => {
    if (!exportRef.current) return
    if (!checkRateLimit("pdf")) {
      toast.warning("Vui lòng chờ một chút trước khi tải tiếp.")
      return
    }
    const toastId = toast.loading("Đang tạo PDF...")
    setIsExporting(true)
    try {
      const dataUrl = await toPng(exportRef.current, {
        pixelRatio: PIXEL_RATIO,
        cacheBust: true,
        quality: 1,
      })
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [EXPORT_WIDTH, EXPORT_HEIGHT] })
      pdf.addImage(dataUrl, "PNG", 0, 0, EXPORT_WIDTH, EXPORT_HEIGHT)
      pdf.save(`thiep-moi-${slug}.pdf`)
      toast.success("Tải PDF thành công!", { id: toastId })
    } catch {
      toast.error("Không thể tạo PDF. Vui lòng thử lại.", { id: toastId })
    } finally {
      setIsExporting(false)
    }
  }

  return { downloadPng, downloadPdf, isExporting }
}
