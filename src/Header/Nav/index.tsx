'use client'

import React from 'react'

import type { Header as HeaderType, Page, Post } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { ButtonProps } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const path = usePathname()

  return (
    <nav className="sticky top-0 flex gap-8 items-center">
      {navItems.map(({ link }, i) => {
        if (link.label === 'home') link.url = '/'
        return <NavItem key={i} {...link} isCurrentPath={path === link.url} appearance="link" />
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  isCurrentPath: boolean
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

const NavItem: React.FC<CMSLinkType> = (props) => {
  return (
    <Link href={'' + props.url} className={!props.isCurrentPath ? 'text-primary/80' : ''}>
      <span className="text-blue-500">#</span>
      {props.label}
    </Link>
  )
}
