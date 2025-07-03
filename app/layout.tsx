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
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
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