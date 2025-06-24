'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { AlignRightIcon, SidebarOpen } from 'lucide-react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const isMobile = useIsMobile()

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
        scrollPosition > 0 ? 'bg-background border-b-primary' : 'bg-transparent',
        'sticky top-0 z-20 transition-shadow',
      )}
    >
      <div className="container" {...(theme ? { 'data-theme': theme } : {})}>
        <div className="py-8 flex justify-between">
          <Link href="/">
            {/* <Logo loading="eager" priority="high" className="invert dark:invert-0" /> */}
            <h1 className="text-xl font-bold">tdh.schwarzen_</h1>
          </Link>
          {!isMobile ? <HeaderNav data={data} /> : <SidebarMobile data={data} />}
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

const SidebarMobile = ({ data }: { data: Header }) => {
  const [sideBarOpen, openSidebar, closeSidebar] = useSidebarOpen()
  return (
    <div>
      <AlignRightIcon
        className="md:hidden hover:cursor-pointer"
        onClick={openSidebar}
        aria-label="Open Menu"
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full bg-background shadow-lg z-50 transform transition-transform duration-300 ${
          sideBarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b-primary">
          <span className="text-xl font-bold">Menu</span>
          <button
            className="text-2xl font-bold text-gray-600"
            onClick={closeSidebar}
            aria-label="Close Menu"
          >
            &times;
          </button>
        </div>
        <nav className="flex flex-col gap-6 mt-8 px-6">
          {data.navItems!.map((item) => (
            <a
              key={item.id}
              href={item.link.url!}
              className="text-gray-700 hover:text-blue-600 font-medium text-lg"
              onClick={closeSidebar}
            >
              {item.link.label}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  )
}

function useIsMobile(breakpoint = 768) {
  return React.useSyncExternalStore(
    (cb) => {
      window.addEventListener('resize', cb)
      return () => window.removeEventListener('resize', cb)
    },
    () => window.innerWidth < breakpoint,
    () => false, // fallback for SSR
  )
}

// This hook manages sidebar open state via a ref and a forceUpdate trick
function useSidebarOpen() {
  const openRef = React.useRef(false)
  const [, forceUpdate] = React.useReducer((c) => c + 1, 0)

  const open = () => {
    openRef.current = true
    forceUpdate()
  }
  const close = () => {
    openRef.current = false
    forceUpdate()
  }

  return [openRef.current, open, close] as const
}
