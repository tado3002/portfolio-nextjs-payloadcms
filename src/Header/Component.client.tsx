'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const scrollPosition = useScrollPosition()

  return (
    <header
      className={classNames(
        scrollPosition > 0 ? 'bg-background/95 backdrop-blur' : 'bg-transparent',
        'sticky top-0 z-20 transition-shadow supports-[backdrop-filter]:bg-background/60',
      )}
    >
      <div className="container " {...(theme ? { 'data-theme': theme } : {})}>
        <div className="py-8 flex justify-between">
          <Link href="/">
            {/* <Logo loading="eager" priority="high" className="invert dark:invert-0" /> */}
            <h1 className="text-xl font-bold">tdh.schwarzen_</h1>
          </Link>
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset)
    }

    window.addEventListener('scroll', updatePosition)

    updatePosition()

    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}
