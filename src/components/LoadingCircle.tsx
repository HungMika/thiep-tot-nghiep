interface LoadingCircleProps {
  size?: "sm" | "md"
}

export default function LoadingCircle({ size = "sm" }: LoadingCircleProps) {
  const dimension = size === "sm" ? 16 : 24

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-label="Đang tải"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="#EDD5B8"
        strokeWidth="3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="#FFB347"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
