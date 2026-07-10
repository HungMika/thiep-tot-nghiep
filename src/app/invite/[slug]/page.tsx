import { redirect } from "next/navigation"
import InvitePageView from "@/features/invite/InvitePageView"

interface InvitePageProps {
  params: Promise<{ slug: string }>
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { slug } = await params
  const guestName = decodeURIComponent(slug)

  if (!guestName.trim()) {
    redirect("/")
  }

  return <InvitePageView guestName={guestName} slug={slug} />
}