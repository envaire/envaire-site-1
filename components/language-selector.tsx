"use client"

import { useLanguage } from "@/contexts/language-context"
import { Globe } from "lucide-react"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = (newLanguage: "en" | "fi") => {
    setLanguage(newLanguage)
  }

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-400" />
      <div className="flex rounded-full bg-black/40 border border-gray-700 overflow-hidden">
        <button
          onClick={() => handleLanguageChange("en")}
          className={`px-3 py-1 text-xs transition-all duration-200 ${
            language === "en"
              ? "bg-emerald-500 text-black font-medium"
              : "text-gray-300 hover:text-white hover:bg-gray-700/50"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange("fi")}
          className={`px-3 py-1 text-xs transition-all duration-200 ${
            language === "fi"
              ? "bg-emerald-500 text-black font-medium"
              : "text-gray-300 hover:text-white hover:bg-gray-700/50"
          }`}
        >
          FI
        </button>
      </div>
    </div>
  )
}
