import { redirect } from "next/navigation"
import { getEventByHost } from "@/features/invite/utils/fetchSheet"
import InvitePageView from "@/features/invite/InvitePageView"
import NotFound from "@/components/NotFound"

interface GuestRouteProps {
  params: Promise<{ hostName: string; guestName: string }>
}

export default async function GuestRoute({ params }: GuestRouteProps) {
  const { hostName, guestName: rawGuestName } = await params
  const guestName = decodeURIComponent(rawGuestName)

  if (!guestName.trim()) {
    redirect(`/${hostName}`)
  }

  const event = await getEventByHost(hostName)

  if (!event) {
    return <NotFound />
  }

  return <InvitePageView event={event} guest={guestName} />
}
