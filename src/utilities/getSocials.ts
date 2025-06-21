import { Icon, Social } from '@/payload-types'

export type GetSocials = Omit<Social, 'icon'> & { icon: Icon }
export default async function getSocials(): Promise<GetSocials[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/socials?depth=1`)
  const data = await res.json()
  return data.docs
}
