# AI Agent Flow Rules — huda-graduations

These rules prevent the agent from self-inventing solutions. Read `context.md` first, then follow the decision tree below for every task.

## Mandatory Read Order (start of every session)
1. `docs/context.md` — project structure, constants, routes
2. `docs/ui-ux-rules.md` — colors, layout, components
3. `docs/code-constraints.md` — technical rules, error prevention
4. `docs/code-log.md` — what has already been built (avoid duplication)

## Decision Tree

### Before writing any code
```
1. Does a file for this feature already exist?
   YES → read the file first, then modify. Do not rewrite from scratch.
   NO  → follow folder structure in context.md to decide where to create it.

2. Is this UI work?
   YES → must follow ui-ux-rules.md. No custom colors outside the palette.

3. Is this export/image/PDF work?
   YES → must follow code-constraints.md §Export section.

4. Is this a new package/library?
   YES → check package.json first. Do not assume it is installed.
```

### When a requirement is ambiguous
- Do not invent behavior. Ask one clarifying question before proceeding.
- If the user says "make it look nice" without spec → apply ui-ux-rules.md defaults, do not freestyle.

### When adding a new component
- Check if a shadcn/ui component covers the need first.
- Only build custom if shadcn doesn't cover it.
- Place in `features/invite/components/` (invite-specific) or `src/components/` (shared).

### When the task touches the invitation card
- There are TWO card components. Always confirm which one to edit:
  - `InviteCard.tsx` — online view (has countdown, map button)
  - `InviteCardExport.tsx` — export target (no countdown, no map, fixed 600×900px)
- Changes to visual layout usually affect BOTH. Update both unless explicitly told otherwise.

### When adding text/labels
- All display text must be Vietnamese. No English labels visible to users.
- Constants (EVENT.hostName, etc.) live in `features/invite/constants.ts`. Never hardcode event data in JSX.

### Rate limiting rule
- PNG and PDF download buttons must respect the rate limiter in `utils/rateLimit.ts`.
- Limit: max 3 downloads per minute per button type.
- On limit hit: show Sonner warning toast in Vietnamese, do not throw an error.

### Zustand usage
- Zustand is optional and only for "recent links" list on home page.
- Do not use Zustand for invite card state — URL params are the source of truth.
- Do not persist export state in Zustand.

## Things the Agent Must Never Do
- Never hardcode `#FFEBD3` or any color in JSX style props — use Tailwind classes matching the palette.
- Never write logic directly in `page.tsx` — pages are thin wrappers that import from `features/`.
- Never add a new npm package without noting it in the code-log.
- Never change `EVENT` constants without confirmation — event time and venue are fixed.
- Never use `<img>` for the background in `InviteCardExport` without `crossOrigin="anonymous"`.
- Never skip the `pixelRatio: 3` option in `html-to-image` calls.
- Never add English UI text — all labels, placeholders, error messages, toast messages must be Vietnamese.
- Never use emoji as UI icons — use `lucide-react`.
- Never leave TODO comments in committed code.

## Code-Log Rule
After every coding session (one or more related changes), append a one-line entry to `docs/code-log.md`:
```
DD/MM/YYYY: <short summary of what was built/changed>
```
Example:
```
10/07/2026: scaffolded features/invite, added InviteCard + InviteCardExport, hooked up html-to-image PNG export
```
