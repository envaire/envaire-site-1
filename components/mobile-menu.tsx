"use client"

import { LanguageSelector } from "@/components/language-selector"

export function MobileMenu() {
  return (
    <div className="md:hidden">
      <LanguageSelector />
    </div>
  )
}
