import type { EventConfig } from "../constants"

const SHEET_TSV_URL = process.env.SHEET_TSV_URL

export async function getEventByHost(hostName: string): Promise<EventConfig | null> {
  if (!SHEET_TSV_URL) return null

  let res: Response
  try {
    res = await fetch(SHEET_TSV_URL, { next: { revalidate: 60 } })
  } catch {
    return null
  }

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
