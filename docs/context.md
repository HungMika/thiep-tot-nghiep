# Project Context — graduation-invite

## Overview
A shared graduation invitation platform. Each host gets a personalized link at `/{hostName}` — the card data is pulled from a shared Google Sheet managed internally. Guests receive the link, view an online invitation card with a live countdown and map, then download a PNG or PDF version.

No database. No auth. The Google Sheet is the single source of truth, managed by the site owner.

---

## Google Sheet — Source of Truth

### Publish URL
Stored in `.env` as `SHEET_TSV_URL`. Must be published as **TSV** (not CSV, not HTML):
`File → Share → Publish to web → Sheet1 → TSV format → Publish`

TSV URL format:
```
https://docs.google.com/spreadsheets/d/e/<ID>/pub?gid=0&single=true&output=tsv
```

### Column Schema (header row required)
```
hostName | displayName | datetime | displayDatetime | venue | mapUrl | school | img
```

| Column            | Format / Notes                                                  |
|-------------------|-----------------------------------------------------------------|
| `hostName`        | URL-safe string, no spaces (e.g. `HungDQ`, `AnhNV`) — used as route param |
| `displayName`     | Full display name, may include spaces (e.g. `Đặng Quốc Hưng`) |
| `datetime`        | ISO 8601 with timezone: `2026-07-24T10:30:00+07:00`            |
| `displayDatetime` | Human-readable Vietnamese: `10:30 SA, Thứ Sáu, 24/07/2026`  |
| `venue`           | Full address string                                             |
| `mapUrl`          | Google Maps short link                                          |
| `school`          | Full school name in Vietnamese                                  |
| `img`             | Filename only — must exist in `/public/images/` (e.g. `hcmue.webp`) |

### Revalidation
Sheet is fetched server-side with `{ next: { revalidate: 300 } }` — updates reflect within 5 minutes of editing the sheet.

---

## Route Structure

```
/                          → Home: host enters hostName → validate sheet → redirect /[hostName]
/[hostName]                → Host sharing page: shows displayName + guest name input form
                             → không tìm thấy → trang 404 tiếng Việt
/[hostName]/[guestName]    → Invite card: renders InviteCard with event + guest name
                             → không tìm thấy host → 404; guestName empty → redirect /[hostName]
```

### Slug / hostName encoding
- `hostName` in sheet: plain string, no encoding needed (no spaces allowed)
- On the home form: validates via server action before `router.push(`/${hostName.trim()}`)`
- On the host page: `params.hostName` is used directly to look up the sheet row

### Guest name
Guest name is a URL segment on the invite card page:
```
/{hostName}/{encodeURIComponent(guestName)}
```
- Always `encodeURIComponent` on navigate, `decodeURIComponent` on read
- Guest name is display-only — never used in sheet lookup or API calls

---

## EventConfig Type

```ts
export type EventConfig = {
  hostName: string
  displayName: string  // full name for display (may have spaces)
  datetime: Date
  displayDatetime: string
  venue: string
  mapUrl: string
  school: string
  img: string          // filename, e.g. "hcmue.webp"
  bgImage: string      // computed: `/images/${img}`
}
```

No hardcoded `EVENT` constant. All event data comes from the sheet at request time.

---

## Folder Structure

```
src/
  app/
    page.tsx                           # imports from features/home
    [hostName]/
      page.tsx                         # host sharing page — renders HostPage
      loading.tsx
      [guestName]/
        page.tsx                       # invite card — renders InvitePageView
        loading.tsx
  features/
    home/
      HomeForm.tsx
      useHomeForm.ts
      actions.ts                       # server action: checkHostExists
    host/
      HostPage.tsx                     # guest name input form for sharing page
    invite/
      InvitePageView.tsx
      components/
        InviteCard.tsx                 # online card: countdown + map
        InviteCardExport.tsx           # ref-forwarded, no countdown/map, for html-to-image
        CountdownTimer.tsx
        MapButton.tsx
        DownloadButtons.tsx
      hooks/
        useCountdown.ts
        useExport.ts                   # PNG + PDF logic + rate limiting
      utils/
        fetchSheet.ts                  # fetch TSV, parse rows, find by hostName
        exportHelpers.ts               # toBase64, pixelRatio, blur gradient
        rateLimit.ts                   # client-side rate limiter
  components/
    ui/                                # shadcn components
    LoadingPage.tsx                    # full-page loading overlay
    LoadingCircle.tsx                  # spinner for buttons
    NotFound.tsx                       # 404 page in Vietnamese
  lib/
    utils.ts
public/
  images/
    hcmue.webp                         # add one file per school
    hcmus.webp
    uel.webp
    # ...
docs/
  context.md
  ui-ux-rules.md
  ai-flow-rules.md
  code-constraints.md
  code-log.md
```

---

## fetchSheet Logic

```ts
// features/invite/utils/fetchSheet.ts

export async function getEventByHost(hostName: string): Promise<EventConfig | null> {
  const res = await fetch(process.env.SHEET_TSV_URL!, {
    next: { revalidate: 300 },
  })
  if (!res.ok) return null

  const text = await res.text()
  const [headerRow, ...rows] = text.trim().split("\n")
  const headers = headerRow.split("\t").map((h) => h.trim())

  for (const row of rows) {
    const values = row.split("\t").map((v) => v.trim())
    const entry = Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]))

    if (entry.hostName === hostName) {
      return {
        hostName: entry.hostName,
        displayName: entry.displayName,
        datetime: new Date(entry.datetime),
        displayDatetime: entry.displayDatetime,
        venue: entry.venue,
        mapUrl: entry.mapUrl,
        school: entry.school,
        img: entry.img,
        bgImage: `/images/${entry.img}`,
      }
    }
  }

  return null
}
```

> TSV is used instead of CSV specifically to avoid comma-collision issues with Vietnamese addresses and school names. Tab characters never appear in those values, so splitting on `\t` is always safe.

---

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand (saved links on home page, optional)
- **Export**: `html-to-image` (PNG) → `jsPDF` (PDF via PNG embed)
- **Toast**: Sonner
- **Icons**: `lucide-react`
- **Data source**: Google Sheets (published TSV)
- **Deploy**: Vercel

## Required Packages
```
html-to-image  jspdf  sonner  lucide-react  zustand
```
Always check `package.json` before coding. If missing: `npm install html-to-image jspdf sonner lucide-react zustand`

## Environment Variables
```
SHEET_TSV_URL=https://docs.google.com/spreadsheets/d/e/<ID>/pub?gid=0&single=true&output=tsv
```

## Related Skill Files
- UI/UX rules → `docs/ui-ux-rules.md`
- AI agent flow → `docs/ai-flow-rules.md`
- Code constraints → `docs/code-constraints.md`
- Change log → `docs/code-log.md`