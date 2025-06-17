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
        <div className="fixed inset-0 z-50 bg-black">
          <div className="flex justify-end p-4">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white">
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <nav className="flex flex-col items-center gap-8 p-8">
            <LanguageSelector />
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
              className="text-xl hover:text-emerald-400 transition-colors"
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
              className="text-xl hover:text-emerald-400 transition-colors"
            >
              {t("nav.process")}
            </button>
            <Button
              className="bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-emerald-600 hover:to-emerald-400 text-white rounded-md flex items-center gap-2 mt-4"
              onClick={() => {
                setIsOpen(false)
                // You'll need to pass a callback prop to handle opening the booking modal
              }}
            >
              {t("hero.bookMeeting")}
            </Button>
          </nav>
        </div>
      )}
    </div>
  )
}
