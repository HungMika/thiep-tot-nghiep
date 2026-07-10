import type { Metadata } from "next"
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["vietnamese"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
})

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-be-vietnam",
})

export const metadata: Metadata = {
  title: "Thiệp Mời Tốt Nghiệp — Đặng Quốc Hưng",
  description:
    "Thiệp mời lễ tốt nghiệp cử nhân Công Nghệ Thông Tin của Đặng Quốc Hưng tại Trường Đại học Sư Phạm TP.HCM.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${beVietnam.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              success: "!bg-[#D4EDDA] !text-[#1D6B35] !border-[#A8D5B5]",
              error: "!bg-[#FFE0DC] !text-[#8B2318] !border-[#F5B8B2]",
              warning: "!bg-[#FFF3CD] !text-[#7A5A00] !border-[#F0D98A]",
            },
          }}
        />
      </body>
    </html>
  )
}
