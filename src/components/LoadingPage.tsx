import LoadingCircle from "./LoadingCircle"

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-[#FFEBD3]">
      <LoadingCircle size="md" />
      <p className="text-sm font-medium text-[#7A5C45]">Đang tải...</p>
    </div>
  )
}
