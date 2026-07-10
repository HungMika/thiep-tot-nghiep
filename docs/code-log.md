# Code Log — huda-graduations

Format: `DD/MM/YYYY: <summary>`
Keep each entry to one line. Log after every coding session.

---

10/07/2026: initialized docs folder — context.md, ui-ux-rules.md, ai-flow-rules.md, code-constraints.md, code-log.md
10/07/2026: scaffolded full project — installed html-to-image/jspdf/zustand, built constants, rateLimit, exportHelpers, useCountdown, useExport, LoadingCircle, LoadingPage, CountdownTimer, MapButton, DownloadButtons, InviteCardExport, InviteCard, InvitePageView, HomeForm, useHomeForm, all pages (home/invite/loading), layout with Sonner, globals.css palette; 0 TS errors
10/07/2026: UI overhaul — 50% bg image + 55% cream split, serif font on card, bold guest name text-4xl with amber border-b, 2-box countdown (ngày+giờ only), address always visible + clickable anchor, export gradient softened to pastel cream; 0 TS errors
10/07/2026: fixed font (Playfair Display + Be Vietnam Pro Vietnamese subsets), 50% bg on export card, text hierarchy — guest name largest (text-3xl online/fontSize:40 export), date/time 2nd prominent, countdown compact text-2xl, no system font-serif anywhere; 0 TS errors
10/07/2026: v3 layout rewrite — flexbox column replaces absolute positioning on InviteCard + InviteCardExport, image fixed height (220px online / 450px export), content in normal flow below image, export uses inline styles only, InvitePageView wrapper justify-start py-8; 0 TS errors
