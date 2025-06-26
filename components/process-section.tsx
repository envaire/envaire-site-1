"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Wrench, Rocket } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const steps = [
    {
      icon: Search,
      title: t("process.assess.title"),
      description: t("process.assess.description"),
      details: [
        t("process.assess.detail1"),
        t("process.assess.detail2"),
        t("process.assess.detail3"),
        t("process.assess.detail4"),
      ],
    },
    {
      icon: Wrench,
      title: t("process.demos.title"),
      description: t("process.demos.description"),
      details: [
        t("process.demos.detail1"),
        t("process.demos.detail2"),
        t("process.demos.detail3"),
        t("process.demos.detail4"),
      ],
    },
    {
      icon: Rocket,
      title: t("process.deploy.title"),
      description: t("process.deploy.description"),
      details: [
        t("process.deploy.detail1"),
        t("process.deploy.detail2"),
        t("process.deploy.detail3"),
        t("process.deploy.detail4"),
      ],
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate when section starts and ends being visible
      const sectionTop = rect.top
      const sectionBottom = rect.bottom
      const sectionHeight = rect.height

      // Define the scroll range where animation should happen - more generous range
      const startTrigger = windowHeight * 0.9 // Start when section is 90% visible
      const endTrigger = windowHeight * 0.1 // End when section is 10% from top

      if (sectionTop <= startTrigger && sectionBottom >= endTrigger) {
        // Section is in the animation zone
        const totalScrollableHeight = sectionHeight + windowHeight * 0.8 // Extended scroll range
        const scrolled = startTrigger - sectionTop
        const progress = Math.max(0, Math.min(1, scrolled / totalScrollableHeight))

        setScrollProgress(progress)

        // Update active step based on progress (divide into thirds)
        if (progress < 0.33) {
          setActiveStep(0)
        } else if (progress < 0.66) {
          setActiveStep(1)
        } else {
          setActiveStep(2)
        }
      } else if (sectionTop > startTrigger) {
        // Section hasn't entered animation zone
        setScrollProgress(0)
        setActiveStep(0)
      } else if (sectionBottom < endTrigger) {
        // Section has passed animation zone
        setScrollProgress(1)
        setActiveStep(2)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} id="process" className="container mx-auto px-4 py-16 md:py-24 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
          {t("process.title")}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-300 text-lg">{t("process.description")}</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Vertical Progress Bar - Left Side */}
          <div className="hidden lg:flex lg:w-1/3 lg:flex-col lg:items-start lg:justify-start">
            <div className="relative flex lg:flex-col flex-row lg:h-[800px] w-full lg:w-auto">
              {/* Extended vertical connecting line */}
              <div className="absolute lg:left-8 lg:top-8 lg:bottom-0 lg:w-1 lg:h-full top-8 left-8 right-8 h-1 w-auto bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-b lg:bg-gradient-to-b bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-300 ease-linear rounded-full relative"
                  style={{
                    [!isMobile ? "height" : "width"]: `${scrollProgress * 100}%`,
                    boxShadow: scrollProgress > 0 ? "0 0 10px rgba(34, 197, 94, 0.8)" : "none",
                  }}
                >
                  {/* Animated glow dot at the end of progress */}
                  {scrollProgress > 0 && scrollProgress < 1 && (
                    <div
                      className="absolute lg:bottom-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:translate-y-1/2 right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-emerald-400 rounded-full"
                      style={{
                        boxShadow: "0 0 15px rgba(34, 197, 94, 1), 0 0 30px rgba(34, 197, 94, 0.5)",
                        animation: "pulse 2s infinite",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Step indicators - positioned along the extended line */}
              {steps.map((step, index) => {
                const Icon = step.icon
                const stepThreshold = index / (steps.length - 1)
                const isActive = scrollProgress >= stepThreshold || activeStep >= index
                const isCurrent = index === activeStep

                // Position steps evenly along the extended line
                const stepPosition = (index / (steps.length - 1)) * 100

                return (
                  <div
                    key={index}
                    className={`absolute flex lg:flex-row flex-col items-center lg:mx-0 mx-8 z-10`}
                    style={{
                      [!isMobile ? "top" : "left"]: `${stepPosition}%`,
                      [!isMobile ? "left" : "top"]: !isMobile ? "0" : "50%",
                      transform: !isMobile ? "translateY(-50%)" : "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                        isActive ? "border-emerald-500 bg-emerald-500/20" : "border-gray-600 bg-black/40"
                      } ${isCurrent ? "scale-110" : ""}`}
                      style={{
                        boxShadow: isActive ? "0 0 20px rgba(34, 197, 94, 0.5)" : "none",
                      }}
                    >
                      <Icon
                        className={`w-8 h-8 transition-colors duration-500 ${isActive ? "text-emerald-500" : "text-gray-400"}`}
                      />
                    </div>
                    <div className="lg:ml-6 mt-4 lg:mt-0 text-center lg:text-left">
                      <span
                        className={`text-lg font-medium transition-colors duration-500 ${
                          isActive ? "text-emerald-400" : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Content Boxes - Right Side */}
          <div className="lg:w-2/3 space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === activeStep
              const isVisible = scrollProgress > 0

              return (
                <div
                  key={index}
                  className={`bg-black/40 border rounded-2xl p-8 relative overflow-hidden transition-all duration-500 ${
                    isActive ? "border-emerald-500/50 bg-emerald-500/5" : "border-gray-800"
                  }`}
                  style={{
                    opacity: isVisible ? 1 : 0.7,
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  {/* Background glow for active step */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl" />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-12 h-12 rounded-full p-3 transition-all duration-500 ${
                          isActive ? "bg-gradient-to-br from-emerald-500 to-green-400" : "bg-gray-700"
                        }`}
                        style={{
                          boxShadow: isActive ? "0 0 20px rgba(34, 197, 94, 0.4)" : "none",
                        }}
                      >
                        <Icon className={`w-full h-full ${isActive ? "text-black" : "text-gray-400"}`} />
                      </div>
                      <h3
                        className={`text-2xl font-bold transition-colors duration-500 ${
                          isActive ? "text-emerald-300" : "text-white"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">{step.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {step.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className="flex items-center gap-3 p-3 bg-black/30 rounded-lg transition-all duration-300"
                        >
                          <div
                            className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-300 ${
                              isActive ? "bg-emerald-500" : "bg-gray-500"
                            }`}
                            style={{
                              boxShadow: isActive ? "0 0 8px rgba(34, 197, 94, 0.8)" : "none",
                            }}
                          />
                          <span className="text-gray-300 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
