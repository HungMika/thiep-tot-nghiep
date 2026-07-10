# UI/UX Rules — huda-graduations (v2)

## Color System

### Primary Palette (Pastel)
```
Background base:    #FFEBD3
Surface card:       #FFF8F2
Primary action:     #FFB347
Primary hover:      #FFA020
Secondary action:   #F5D5B0
Text primary:       #3D2B1F
Text secondary:     #7A5C45
Text muted:         #B08060
Border:             #EDD5B8
```

### Semantic Colors (Sonner toasts)
```
Success:   bg #D4EDDA  text #1D6B35
Error:     bg #FFE0DC  text #8B2318
Warning:   bg #FFF3CD  text #7A5A00
Info:      bg #D0E8FF  text #1A4A7A
```

### Sonner config (in layout.tsx)
```tsx
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

---

## Typography

- All UI text: Vietnamese
- Use `font-serif` (Georgia / system serif) for invitation card text — trang trọng hơn sans-serif
- Apply via Tailwind: `font-serif` class on card wrapper
- Headings weight: `font-bold` (700) not `font-semibold` (600)
- Guest name: `font-bold text-3xl md:text-4xl` minimum — must be the most visually dominant element
- Host name: `font-bold text-2xl`
- Supporting text: `font-normal text-sm` italic where appropriate (`italic`)
- Never use default thin/light font weights on invitation card

---

## Invitation Card Layout — REVISED RULES

### Online card (`InviteCard`) — the most important fixes

#### Background image: 50% height only
- Image covers only the TOP 50% of the card
- Bottom 50%: solid white/cream `#FFF8F2` — no background image
- Implementation:
```tsx
<div className="relative w-full" style={{ aspectRatio: "2/3" }}>
  {/* Top 50%: background image */}
  <div
    className="absolute top-0 left-0 w-full"
    style={{
      height: "50%",
      backgroundImage: "url('/images/hcmue.webp')",
      backgroundSize: "cover",
      backgroundPosition: "center top",
    }}
  >
    {/* gradient fade at bottom of image into cream */}
    <div
      className="absolute bottom-0 left-0 w-full"
      style={{ height: "60px", background: "linear-gradient(to bottom, transparent, #FFF8F2)" }}
    />
  </div>

  {/* Bottom 50%: solid cream content area */}
  <div className="absolute bottom-0 left-0 w-full" style={{ height: "55%", background: "#FFF8F2" }} />

  {/* Content overlaid on top of both halves */}
  <div className="absolute inset-0 flex flex-col items-center justify-start pt-4 px-6">
    ...content...
  </div>
</div>
```

#### Text contrast — no more hidden text
- School name at top: white text with `text-shadow` or dark overlay behind it (the image area is light)
- Use a semi-transparent dark pill/band behind school name text: `bg-black/30 px-3 py-1 rounded-full`
- All text in the cream bottom area: `text-[#3D2B1F]` (dark brown) — fully readable

#### Guest name — must stand out
- Size: `text-4xl font-bold font-serif text-[#3D2B1F]`
- Add a subtle golden/amber underline decoration below name: `border-b-2 border-[#FFB347] pb-1`
- "Xin trân trọng kính mời" above: `text-sm italic text-[#7A5C45]`
- "đến tham dự Lễ Tốt Nghiệp" below: `text-base text-[#7A5C45]`

#### Countdown — days and hours only
- Remove minutes and seconds
- Show only: NGÀY and GIỜ (2 boxes, not 4)
- Larger numbers: `text-4xl font-bold`
- Label below: `text-xs tracking-widest text-[#7A5C45]`
- Box style: `bg-white border border-[#EDD5B8] rounded-md px-6 py-3 shadow-sm`

```tsx
<div className="flex gap-4 justify-center">
  <div className="bg-white border border-[#EDD5B8] rounded-md px-6 py-3 text-center shadow-sm">
    <div className="text-4xl font-bold text-[#3D2B1F]">{days}</div>
    <div className="text-xs tracking-widest text-[#7A5C45] mt-1">NGÀY</div>
  </div>
  <div className="bg-white border border-[#EDD5B8] rounded-md px-6 py-3 text-center shadow-sm">
    <div className="text-4xl font-bold text-[#3D2B1F]">{hours}</div>
    <div className="text-xs tracking-widest text-[#7A5C45] mt-1">GIỜ</div>
  </div>
</div>
```

#### Address — always visible, clickable link
- Show address text ALWAYS — do not hide behind a button
- Style as a tappable row with MapPin icon
- Clicking opens EVENT.mapUrl in new tab
- Do NOT use a button component — use an anchor tag styled as a row:
```tsx
<a
  href={EVENT.mapUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-start gap-2 text-[#7A5C45] hover:text-[#FFB347] transition-colors"
>
  <MapPin size={16} className="mt-0.5 shrink-0 text-[#FFB347]" />
  <span className="text-sm text-left">{EVENT.venue}</span>
</a>
```

#### Desktop: full width, reduced height
- Card: `w-full max-w-sm mx-auto` on mobile
- On desktop: card stays `max-w-sm` centered — do NOT stretch to full desktop width (invitation cards are portrait, stretching looks bad)
- Page wrapper: `min-h-screen bg-[#FFEBD3] flex flex-col items-center justify-center py-8 px-4`

---

### Export card (`InviteCardExport`) — for PNG/PDF

- Keep full background image (looks better as a printed artifact)
- Bottom gradient blur: `linear-gradient(to bottom, transparent 50%, rgba(255,235,211,0.85) 100%)` — fades to pastel, not black
- Guest name: `font-bold text-5xl font-serif` white with text-shadow, or dark if contrast allows
- Fixed 600×900px, no responsive classes
- Address: plain text, no link (it's a static image)
- No countdown

---

## Desktop Layout — Invite Page

```
┌─────────────────────────────────┐
│         bg: #FFEBD3             │
│                                 │
│    ┌───────────────────┐        │
│    │  [hcmue image]    │  50%   │
│    │  ─────────────    │        │
│    │  fade to cream    │        │
│    ├───────────────────┤        │
│    │  school name      │        │
│    │  host name        │  50%   │
│    │  ─── divider ───  │  cream │
│    │  kính mời         │        │
│    │  GUEST NAME bold  │        │
│    │  đến tham dự      │        │
│    │  [13 ngày] [22 giờ]        │
│    │  📍 280 An Dương...│        │
│    └───────────────────┘        │
│    [Tải ảnh PNG] [Tải PDF]      │
└─────────────────────────────────┘
```

---

## Responsive
- Mobile-first, 375px base
- Invitation card: `max-w-sm` (384px) centered on all screen sizes
- Buttons below card: `flex gap-3 w-full max-w-sm mx-auto`
- Font scale: mobile `text-3xl` guest name → desktop stays same (card is fixed width)

## Icons
- `lucide-react` only: `MapPin`, `Download`, `FileDown`, `Clock`
- Never inline SVG, never emoji as icon

## Border Radius
- Cards, inputs, buttons: `rounded-md`
- Countdown boxes: `rounded-md`
- No `rounded-lg` or `rounded-xl` unless it's a pill badge