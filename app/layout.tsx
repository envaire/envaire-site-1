import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Envaire | AI Innovation",
  description: "Empowering businesses with elegant AI solutions",
  generator: 'v0.dev',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}