# Project Context — huda-graduations

## Overview
A graduation invitation website for **Đặng Quốc Hưng**, Bachelor of Information Technology, Ho Chi Minh City University of Education (HCMUE).

Users receive a personalized link, view an online invitation card with a live countdown and map, then download a PNG or PDF version of the card.

## Event Details (hardcoded constants)
```ts
export const EVENT = {
  hostName: "Đặng Quốc Hưng",
  degree: "Cử nhân Công Nghệ Thông Tin",
  school: "Trường Đại học Sư Phạm TP.HCM",
  datetime: new Date("2026-07-24T10:00:00+07:00"),
  displayDatetime: "10:00 SA, Thứ Sáu, 24/07/2025",
  venue: "280 An Dương Vương, Phường Chợ Quán, Quận 5, TP.HCM",
  mapUrl: "https://maps.app.goo.gl/zqhAjhnyCN76uwaK9",
  bgImage: "/images/hcmue.webp",
}
```

## Route Structure
```
/                        → Home: form to enter guest name → redirects to /invite/[slug]
/invite/[slug]           → Online invitation card (countdown + map link)
                           + buttons: Preview image | Download PNG | Download PDF
```

### Slug encoding
```ts
const slug = encodeURIComponent(guestName.trim())
const guestName = decodeURIComponent(params.slug)
```

## Folder Structure
```
src/
  app/
    page.tsx                  # imports from features/home
    invite/[slug]/
      page.tsx                # imports from features/invite
  features/
    home/
      HomeForm.tsx
      useHomeForm.ts
    invite/
      components/
        InviteCard.tsx        # online card: countdown + map
        InviteCardExport.tsx  # ref-forwarded, no countdown/map, for html-to-image
        CountdownTimer.tsx
        MapButton.tsx
        DownloadButtons.tsx
      hooks/
        useCountdown.ts
        useExport.ts          # PNG + PDF logic + rate limiting
      utils/
        exportHelpers.ts      # toBase64, pixelRatio, blur gradient
        rateLimit.ts          # client-side rate limiter
      constants.ts            # EVENT object
  components/
    ui/                       # shadcn components
    LoadingPage.tsx           # full-page loading overlay
    LoadingCircle.tsx         # spinner for buttons
  lib/
    utils.ts
public/
  images/
    hcmue.webp
docs/
  context.md
  ui-ux-rules.md
  ai-flow-rules.md
  code-constraints.md
  code-log.md
```

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand (saved links, optional)
- **Export**: `html-to-image` (PNG) → `jsPDF` (PDF via PNG embed)
- **Toast**: Sonner
- **Icons**: `lucide-react`
- **Deploy**: Vercel

## Required Packages
```
html-to-image  jspdf  sonner  lucide-react  zustand
```
Always check package.json before coding. If missing: `npm install html-to-image jspdf sonner lucide-react zustand`

## Related Skill Files
- UI/UX rules → `docs/ui-ux-rules.md`
- AI agent flow → `docs/ai-flow-rules.md`
- Code constraints → `docs/code-constraints.md`
- Change log → `docs/code-log.md`
