import { getEventByHost } from "@/features/invite/utils/fetchSheet"
import HostPage from "@/features/host/HostPage"
import NotFound from "@/components/NotFound"

interface HostRouteProps {
  params: Promise<{ hostName: string }>
}

export default async function HostRoute({ params }: HostRouteProps) {
  const { hostName } = await params
  const event = await getEventByHost(hostName)

  if (!event) {
    return <NotFound />
  }

  return <HostPage event={event} />
}
