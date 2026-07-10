const timestamps: Record<string, number[]> = {}

export function checkRateLimit(key: string, maxPerMinute = 3): boolean {
  const now = Date.now()
  if (!timestamps[key]) timestamps[key] = []
  timestamps[key] = timestamps[key].filter((t) => now - t < 60_000)
  if (timestamps[key].length >= maxPerMinute) return false
  timestamps[key].push(now)
  return true
}
