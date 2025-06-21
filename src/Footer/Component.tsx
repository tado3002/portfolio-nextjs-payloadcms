import Link from 'next/link'
import React from 'react'

import type { Footer, Icon } from '@/payload-types'

import getSocials, { GetSocials } from '@/utilities/getSocials'

export async function Footer() {
  const socials: GetSocials[] = await getSocials()

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <h1 className="text-lg font-bold">tdh.schwarzen_</h1>
          {/* <Logo /> */}
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          {/* <ThemeSelector /> */}
          <nav className="flex flex-col md:flex-row gap-4">
            {socials.map((social) => {
              const icon = social.icon as Icon
              const iconUrl = `https://cdn.simpleicons.org/${icon.name}/black/white`
              return (
                <div key={social.id} className="flex flex-row gap-2 item-end">
                  <img src={iconUrl} className="w-6 h-6" />
                  <span>{social.name} </span>
                </div>
              )
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
