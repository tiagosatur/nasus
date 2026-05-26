'use client'

import { createContext, useContext } from 'react'

const LocaleAlternateContext = createContext<string | null>(null)

export function LocaleAlternateProvider({
  href,
  children,
}: {
  href: string | null
  children: React.ReactNode
}) {
  return (
    <LocaleAlternateContext.Provider value={href}>
      {children}
    </LocaleAlternateContext.Provider>
  )
}

export function useLocaleAlternate() {
  return useContext(LocaleAlternateContext)
}
