"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="relative z-50 text-white">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </Button>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-black/95 backdrop-blur-md shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
          <div className="text-lg font-bold text-white">.ENVAIRE</div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white">
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        <nav className="flex flex-col p-6 bg-black/95">
          <div className="mb-6">
            <LanguageSelector />
          </div>
          <div className="space-y-6">
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsOpen(false)
                setTimeout(() => {
                  const servicesElement = document.getElementById("services")
                  if (servicesElement) {
                    servicesElement.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }, 300)
              }}
              className="w-full text-left text-lg text-white hover:text-emerald-400 transition-colors"
            >
              {t("nav.services")}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsOpen(false)
                setTimeout(() => {
                  const processElement = document.getElementById("process")
                  if (processElement) {
                    processElement.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }, 300)
              }}
              className="w-full text-left text-lg text-white hover:text-emerald-400 transition-colors"
            >
              {t("nav.process")}
            </button>
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-md py-3 mt-6 text-lg font-medium"
              onClick={() => {
                setIsOpen(false)
                // You'll need to pass a callback prop to handle opening the booking modal
              }}
            >
              {t("hero.bookMeeting")}
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}
