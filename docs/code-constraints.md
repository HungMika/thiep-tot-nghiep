# Code Constraints & Error Prevention — huda-graduations

## General Rules
- No comments in code unless explaining a non-obvious workaround
- No logic in `page.tsx` — only imports and a single component render
- Extract helpers to separate files if the function is used more than once
- If a block of logic exceeds ~30 lines inside a component, extract to a hook or util file
- No `any` types in TypeScript without a comment explaining why
- All async functions must have try/catch with a Sonner toast on error

## Package Checks
Before using any library, verify it exists in `package.json`. Required packages:
```
html-to-image   jspdf   sonner   lucide-react   zustand
```
Install command if missing:
```bash
npm install html-to-image jspdf sonner lucide-react zustand
```

---

## Export — PNG (html-to-image)

### Mandatory options
```ts
import { toPng } from "html-to-image"

const dataUrl = await toPng(ref.current, {
  pixelRatio: 3,
  cacheBust: true,
  quality: 1,
})
```
- `pixelRatio: 3` — required. Without it, output is blurry on Retina screens.
- `cacheBust: true` — prevents stale CORS cache issues with the background image.
- Never call `toPng` on `InviteCard` (online card). Always target `InviteCardExport`.

### Background image in export card
- Use CSS `background-image: url('/images/hcmue.webp')` on a div, not `<Image>` from next/image.
- This avoids Next.js image optimization rewriting the URL, which breaks `html-to-image`.
- The export card must have a fixed pixel size — do not use percentage widths:
```tsx
<div
  ref={exportRef}
  style={{ width: 600, height: 900, position: "relative", overflow: "hidden" }}
>
```

### Bottom blur gradient
- Implement as an absolutely-positioned child div — do NOT use CSS `backdrop-filter` (not captured by html-to-image reliably):
```tsx
<div
  style={{
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))",
    pointerEvents: "none",
  }}
/>
```

### Download trigger
```ts
const link = document.createElement("a")
link.download = `thiep-moi-${slug}.png`
link.href = dataUrl
link.click()
```

---

## Export — PDF (jsPDF)

### Flow: PNG first, then embed in PDF
```ts
import jsPDF from "jspdf"

const dataUrl = await toPng(exportRef.current, { pixelRatio: 3, cacheBust: true })
const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [600, 900] })
pdf.addImage(dataUrl, "PNG", 0, 0, 600, 900)
pdf.save(`thiep-moi-${slug}.pdf`)
```
- Do not use `html2canvas` or any other capture method — stay consistent with `html-to-image`.
- PDF dimensions must match export card dimensions (600×900).

---

## Rate Limiting (Vercel deploy)

Client-side rate limit for PNG and PDF download buttons. Max 3 per minute per type.

### Implementation (`features/invite/utils/rateLimit.ts`)
```ts
const timestamps: Record<string, number[]> = {}

export function checkRateLimit(key: string, maxPerMinute = 3): boolean {
  const now = Date.now()
  if (!timestamps[key]) timestamps[key] = []
  timestamps[key] = timestamps[key].filter((t) => now - t < 60_000)
  if (timestamps[key].length >= maxPerMinute) return false
  timestamps[key].push(now)
  return true
}
```

### Usage in `useExport.ts`
```ts
if (!checkRateLimit("png")) {
  toast.warning("Vui lòng chờ một chút trước khi tải tiếp.")
  return
}
```

---

## Next.js Image — `hcmue.webp`

- For display in `InviteCard` (online view), use `<Image>` from `next/image` normally:
```tsx
<Image
  src="/images/hcmue.webp"
  alt="Trường Đại học Sư Phạm TP.HCM"
  fill
  className="object-cover"
  priority
/>
```
- For export (`InviteCardExport`), use a plain `<div>` with CSS background — NOT `<Image>`.
- Never add `unoptimized` prop unless explicitly debugging export issues.

---

## Countdown Timer

- Use `useCountdown` hook in `features/invite/hooks/useCountdown.ts`
- Target: `EVENT.datetime` from constants
- Update every second with `setInterval`, clean up on unmount
- Return `{ days, hours, minutes, seconds, isPast }`
- When `isPast === true`, show "Sự kiện đã diễn ra" instead of the timer

```ts
export function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}

function calcTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    isPast: false,
  }
}
```

---

## Slug Handling

- Always decode slug on the invite page:
```ts
const guestName = decodeURIComponent(params.slug)
```
- Validate: if `guestName` is empty after decode, redirect to `/`
- Guest name is display-only. Never use it in API calls or DB queries.

---

## Sonner Toast Setup

Place `<Toaster>` in `src/app/layout.tsx` once. Never add it inside feature components.

```tsx
import { Toaster } from "sonner"

<Toaster
  position="top-center"
  toastOptions={{
    classNames: {
      success: "!bg-[#D4EDDA] !text-[#1D6B35] !border-[#A8D5B5]",
      error:   "!bg-[#FFE0DC] !text-[#8B2318] !border-[#F5B8B2]",
      warning: "!bg-[#FFF3CD] !text-[#7A5A00] !border-[#F0D98A]",
    },
  }}
/>
```

### Toast messages (Vietnamese)
```ts
toast.success("Tải ảnh thành công!")
toast.success("Tải PDF thành công!")
toast.error("Không thể tạo ảnh. Vui lòng thử lại.")
toast.error("Không thể tạo PDF. Vui lòng thử lại.")
toast.warning("Vui lòng chờ một chút trước khi tải tiếp.")
toast.loading("Đang tạo ảnh...")
toast.loading("Đang tạo PDF...")
```

---

## Loading States

### `LoadingPage` (`src/components/LoadingPage.tsx`)
- Full-screen overlay with pastel background `#FFEBD3`
- Centered `<LoadingCircle />` + text "Đang tải..."
- Use in `src/app/invite/[slug]/loading.tsx`

### `LoadingCircle` (`src/components/LoadingCircle.tsx`)
- Small inline spinner, `size` prop: `"sm" | "md"` (default `"sm"`)
- Color: `#FFB347` (pastel amber)
- Used inside buttons during async operations

---

## Common Pitfalls to Avoid

| Pitfall | Prevention |
|---|---|
| Background image missing in PNG export | Use CSS `background-image` on div, not `<Image>` |
| Blurry PNG output | Always set `pixelRatio: 3` |
| CORS error on export | `cacheBust: true` + image in `/public` |
| Export captures wrong element | Attach `ref` only to `InviteCardExport`, never `InviteCard` |
| Rate limit bypass on refresh | `timestamps` resets — acceptable for client-side; Vercel limits handle server |
| Countdown not cleaning up | Always return cleanup fn from `useEffect` |
| Guest name with special chars breaks URL | `encodeURIComponent` on create, `decodeURIComponent` on read |
| PDF wrong size | Match jsPDF format exactly to export card pixel dimensions |
