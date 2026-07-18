import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FFEBD3] flex flex-col items-center justify-center px-4 gap-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <p className="text-6xl font-bold text-[#FFB347]">404</p>
        <h1 className="text-2xl font-bold text-[#3D2B1F]">Không tìm thấy trang này</h1>
        <p className="text-sm text-[#7A5C45] max-w-xs">
          Đường dẫn bạn nhập không tồn tại hoặc hostName chưa được đăng ký trong hệ thống.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-md bg-[#FFB347] px-6 py-3 text-sm font-semibold text-[#3D2B1F] transition-colors hover:bg-[#FFA020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB347] focus-visible:ring-offset-2"
      >
        Về trang chủ
      </Link>
    </main>
  )
}
