"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="text-white">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="text-lg font-bold text-white">.ENVAIRE</div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white">
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <nav className="flex flex-col p-6">
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
      )}
    </div>
  )
}
