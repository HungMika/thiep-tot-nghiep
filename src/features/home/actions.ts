"use server"

import { getEventByHost } from "@/features/invite/utils/fetchSheet"

export async function checkHostExists(hostName: string): Promise<boolean> {
  const event = await getEventByHost(hostName)
  return event !== null
}
