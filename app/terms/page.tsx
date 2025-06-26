"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function TermsPage() {
  const { t } = useLanguage()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Mouse follower glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34,197,94,0.06), transparent 40%)`,
        }}
      />

      {/* Background pattern with enhanced green glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0,transparent_70%)] pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-emerald-400 p-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("terms.backToHome")}
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            {t("terms.title")}
          </h1>
          <p className="text-gray-400 mb-8">{t("terms.lastUpdated")}</p>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-black/40 border border-gray-800 rounded-lg p-8 space-y-6">
              <p className="text-gray-300 leading-relaxed">{t("terms.welcome")}</p>

              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">{t("terms.section1.title")}</h2>
                  <p className="text-gray-300 leading-relaxed">{t("terms.section1.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">{t("terms.section2.title")}</h2>
                  <p className="text-gray-300 leading-relaxed">{t("terms.section2.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">{t("terms.section3.title")}</h2>
                  <p className="text-gray-300 leading-relaxed">{t("terms.section3.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">{t("terms.section4.title")}</h2>
                  <p className="text-gray-300 leading-relaxed">{t("terms.section4.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">{t("terms.section5.title")}</h2>
                  <p className="text-gray-300 leading-relaxed">{t("terms.section5.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">{t("terms.section6.title")}</h2>
                  <p className="text-gray-300 leading-relaxed">{t("terms.section6.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">{t("terms.section7.title")}</h2>
                  <p className="text-gray-300 leading-relaxed">{t("terms.section7.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">{t("terms.contact.title")}</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {t("terms.contact.content")}{" "}
                    <a href="mailto:info@envaire.com" className="text-emerald-400 hover:text-emerald-300 underline">
                      info@envaire.com
                    </a>
                    .
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-gray-800 pt-8">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors">
                {t("footer.termsOfService")}
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors">
                {t("footer.privacyPolicy")}
              </Link>
            </div>
            <div className="text-gray-400">
              {t("footer.businessId")} 1234567-8
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
