"use client"

import Image from "next/image"
import { useHomeForm } from "./useHomeForm"
import { EVENT } from "../invite/constants"
import LoadingCircle from "@/components/LoadingCircle"

export default function HomeForm() {
  const { name, error, loading, setName, onSubmit } = useHomeForm()

  return (
    <main className="relative min-h-dvh flex flex-col items-center justify-start overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={EVENT.bgImage}
          alt="Trường Đại học Sư Phạm TP.HCM"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Pastel overlay */}
      <div className="absolute inset-0 bg-[#FFEBD3]/70" />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#FFEBD3] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 pt-16 pb-10 w-full max-w-sm">
        {/* Hero text */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs uppercase tracking-widest text-[#7A5C45] font-medium">
            {EVENT.school}
          </p>
          <h1 className="text-3xl font-bold text-[#3D2B1F] leading-tight md:text-4xl">
            Lễ Tốt Nghiệp
          </h1>
          <p className="text-base text-[#7A5C45] font-medium">{EVENT.hostName}</p>
          <p className="text-sm text-[#B08060]">{EVENT.displayDatetime}</p>
        </div>

        {/* Divider */}
        <div className="w-16 h-0.5 rounded-full bg-[#FFB347]" />

        {/* Form card */}
        <div className="w-full rounded-md bg-[#FFF8F2] border border-[#EDD5B8] shadow-md p-6 flex flex-col gap-4">
          <p className="text-sm text-[#7A5C45] text-center">
            Nhập họ tên của bạn để xem thiệp mời nè
          </p>

          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="guest-name"
                className="text-sm font-semibold text-[#3D2B1F]"
              >
                Họ và tên khách mời
              </label>
              <input
                id="guest-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Hiếu thứ hai"
                autoComplete="name"
                className="w-full rounded-md border border-[#EDD5B8] bg-white px-3 py-2.5 text-sm text-[#3D2B1F] placeholder:text-[#B08060] outline-none transition-colors focus:border-[#FFB347] focus:ring-2 focus:ring-[#FFB347]/30"
                onFocus={(e) => e.currentTarget.scrollIntoView({ behavior: "smooth", block: "center" })}
                aria-describedby={error ? "guest-name-error" : undefined}
                aria-invalid={!!error}
              />
              {error && (
                <p
                  id="guest-name-error"
                  role="alert"
                  className="text-xs text-[#8B2318] mt-0.5"
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#FFB347] px-4 py-3 text-sm font-semibold text-[#3D2B1F] transition-colors hover:bg-[#FFA020] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB347] focus-visible:ring-offset-2"
            >
              {loading && <LoadingCircle size="sm" />}
              Xem thiệp mời
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
