"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { useState, useEffect } from "react"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { BookingModal } from "@/components/booking-modal"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced mouse glow effect */}
      <div
        className="fixed hidden md:block pointer-events-none z-30 w-96 h-96 rounded-full opacity-40 transition-opacity duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background:
            "radial-gradient(circle, rgba(34, 197, 94, 0.8) 0%, rgba(34, 197, 94, 0.4) 25%, rgba(34, 197, 94, 0.2) 50%, rgba(16, 185, 129, 0.1) 70%, transparent 90%)",
          filter: "blur(60px)",
        }}
      />

      {/* Background pattern with enhanced green glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 pointer-events-none" />
        <div className="absolute hidden md:block inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.25)_0,transparent_70%)] pointer-events-none" />
        <div className="absolute hidden md:block -top-40 -left-40 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute hidden md:block top-1/3 -right-20 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute hidden md:block bottom-1/4 left-1/4 w-80 h-80 bg-green-900/20 rounded-full blur-3xl" />
        <div className="absolute hidden md:block top-1/4 right-1/3 w-72 h-72 bg-emerald-800/25 rounded-full blur-2xl" />
      </div>

      {/* Header - Oval/Pill Shape with Animated Border */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="max-w-5xl mx-auto relative">
          <div className="md:animated-border-header bg-black/60 backdrop-blur-md md:rounded-full px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">
                <span className="text-emerald-500">.</span>ENVAIRE
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  const servicesElement = document.getElementById("services")
                  if (servicesElement) {
                    servicesElement.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
                className="px-3 py-1 rounded-full text-sm hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {t("nav.services")}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  const processElement = document.getElementById("process")
                  if (processElement) {
                    processElement.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
                className="px-3 py-1 rounded-full text-sm hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {t("nav.process")}
              </button>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <LanguageSelector />
              <button
                onClick={() => setIsBookingOpen(true)}
                className="animated-border px-4 py-1.5 bg-black/80 text-white text-sm rounded-full border border-gray-700/50 hover:border-emerald-500/50"
              >
                <span className="flex items-center gap-1">
                  {t("header.letsTalk")} <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>

            <MobileMenu />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-8 md:pt-32 md:pb-16 text-center relative z-10">
        <div className="inline-block mb-8 px-3 py-1 bg-black/30 border border-gray-700 rounded-full text-sm">
          <span
            className="inline-block w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50 mr-2 animate-pulse"
            style={{ boxShadow: "0 0 10px #10b981, 0 0 20px #10b981, 0 0 30px #10b981" }}
          ></span>
          {t("hero.online")}
        </div>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-emerald-200 bg-clip-text text-transparent">
          {t("hero.title")}{" "}
          <span className="text-white inline-block relative">
            <span className="absolute inset-0 text-emerald-400 blur-[1px] animate-pulse">✦</span>✦
          </span>
        </h2>
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-10 bg-gradient-to-r from-emerald-600 to-emerald-400 text-transparent bg-clip-text leading-relaxed py-2">
          {t("hero.subtitle")}
        </h3>

        <p className="max-w-2xl mx-auto text-gray-300 mb-10 text-lg">{t("hero.description")}</p>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="animated-border px-6 py-3 bg-black text-white mx-auto flex items-center gap-2"
        >
          <span className="flex items-center gap-2">
            {t("hero.bookMeeting")} <ArrowUpRight className="h-4 w-4" />
          </span>
        </button>

        {/* Technologies Section */}
        <div className="mt-16">
          <h4 className="text-gray-400 mb-10">{t("hero.technologies")}</h4>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="inline-block whitespace-nowrap animate-scroll">
              {/* First set of logos */}
              <Image
                src="https://p1yf23hd3v.ufs.sh/f/NbmxJR2qtK0wOiC9IGZJvndqx3HG89Sfr2lmDRCFbIgoja0h"
                alt="V0"
                width={120}
                height={40}
                className="h-10 mx-10 inline-block brightness-0 invert hover:scale-110 transition-transform duration-300"
              />
              <Image
                src="https://p1yf23hd3v.ufs.sh/f/NbmxJR2qtK0weF6iBr17iEyYc0WfFBNSRDrJ1HhKm5kVp2Os"
                alt="OpenAI"
                width={120}
                height={40}
                className="h-10 mx-10 inline-block brightness-0 invert hover:scale-110 transition-transform duration-300"
              />
              <Image
                src="https://p1yf23hd3v.ufs.sh/f/NbmxJR2qtK0wXH5lgfyPVUy8GW1cwjqM30rQlfZ6dNoF7gmD"
                alt="GitHub"
                width={120}
                height={40}
                className="h-10 mx-10 inline-block brightness-0 invert hover:scale-110 transition-transform duration-300"
              />
              <Image
                src="https://p1yf23hd3v.ufs.sh/f/NbmxJR2qtK0wfDWZl7JpGbCnBZE5HOWiQglsX37aLuDyRozf"
                alt="n8n"
                width={120}
                height={40}
                className="h-10 mx-10 inline-block brightness-0 invert hover:scale-110 transition-transform duration-300"
              />
              <Image
                src="https://p1yf23hd3v.ufs.sh/f/NbmxJR2qtK0wBRF4pOsKX7SRmzq2rgZJ0hc8Osk5etdCuGoQ"
                alt="Make"
                width={120}
                height={40}
                className="h-10 mx-10 inline-block brightness-0 invert hover:scale-110 transition-transform duration-300"
              />
              <Image
                src="https://p1yf23hd3v.ufs.sh/f/NbmxJR2qtK0w86YH9veBHw1WgKmlxQ3t9MJN7pF8zUanOEdR"
                alt="Claude"
                width={120}
                height={40}
                className="h-10 mx-10 inline-block brightness-0 invert hover:scale-110 transition-transform duration-300"
              />

              {/* Duplicate set for seamless scroll */}
              <Image
                src="https://p1yf23hd3v.ufs.sh/f/NbmxJR2qtK0wOiC9IGZJvndqx3HG89Sfr2lmDRCFbIgoja0h"
                alt="V0"
                width={120}
                height={40}
                className="h-10 mx-10 inline-block brightness-0 invert hover:scale-110 transition-transform duration-300"
              />
              <Image
                src="https://p1yf23hd3v.ufs.sh/f/NbmxJR2qtK0weF6iBr17iEyYc0WfFBNSRDrJ1HhKm5kVp2Os"
                alt="OpenAI"
                width={120}
                height={40}
                className="h-10 mx-10 inline-block brightness-0 invert hover:scale-110 transition-transform duration-300"
              />
              <Image
                src="https://p1yf23hd3v.ufs.sh/f/NbmxJR2qtK0wXH5lgfyPVUy8GW1cwjqM30rQlfZ6dNoF7gmD"
                alt="GitHub"
                width={120}
                height={40}
                className="h-10 mx-10 inline-block brightness-0 invert hover:scale-110 transition-transform duration-300"
              />
              <Image
                src="https://p1yf23hd3v.ufs.sh/f/NbmxJR2qtK0wfDWZl7JpGbCnBZE5HOWiQglsX37aLuDyRozf"
                alt="n8n"
                width={120}
                height={40}
                className="h-10 mx-10 inline-block brightness-0 invert hover:scale-110 transition-transform duration-300"
              />
              <Image
                src="https://p1yf23hd3v.ufs.sh/f/NbmxJR2qtK0wBRF4pOsKX7SRmzq2rgZJ0hc8Osk5etdCuGoQ"
                alt="Make"
                width={120}
                height={40}
                className="h-10 mx-10 inline-block brightness-0 invert hover:scale-110 transition-transform duration-300"
              />
              <Image
                src="https://p1yf23hd3v.ufs.sh/f/NbmxJR2qtK0w86YH9veBHw1WgKmlxQ3t9MJN7pF8zUanOEdR"
                alt="Claude"
                width={120}
                height={40}
                className="h-10 mx-10 inline-block brightness-0 invert hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Get Assessed CTA after Services */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{t("cta1.title")}</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">{t("cta1.description")}</p>
          <Button
            onClick={() => setIsBookingOpen(true)}
            className="animated-border px-8 py-4 bg-black text-white text-lg font-medium"
          >
            <span className="flex items-center gap-2">
              {t("cta1.button")} <ArrowUpRight className="h-5 w-5" />
            </span>
          </Button>
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />

      {/* Get Assessed CTA after Process */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{t("cta2.title")}</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">{t("cta2.description")}</p>
          <Button
            onClick={() => setIsBookingOpen(true)}
            className="animated-border px-8 py-4 bg-black text-white text-lg font-medium"
          >
            <span className="flex items-center gap-2">
              {t("cta2.button")} <ArrowUpRight className="h-5 w-5" />
            </span>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 relative z-10 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">{t("footer.businessId")}: 3377350-1</p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              {t("footer.termsOfService")}
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              {t("footer.privacyPolicy")}
            </Link>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  )
}
