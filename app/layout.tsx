import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tasyakuran Pernikahan Lutfhi & Indri",
  description:
    "Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara Tasyakuran Pernikahan Lutfhi Farhan Maulana & Indri Ramdani pada Kamis, 31 Juli 2025 di Villa D'LAFISHA, Sukabumi.",
  keywords: "wedding, pernikahan, tasyakuran, lutfhi, indri, undangan digital, wedding invitation, sukabumi",
  authors: [{ name: "Lutfhi & Indri" }],
  creator: "Lutfhi & Indri",
  publisher: "Wedding Invitation",
  metadataBase: new URL("https://tasyakuran-indri-luthfi.vercel.app"),
  openGraph: {
    title: "Tasyakuran Pernikahan Lutfhi & Indri",
    description:
      "Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara Tasyakuran Pernikahan Lutfhi Farhan Maulana & Indri Ramdani pada Kamis, 31 Juli 2025 di Villa D'LAFISHA, Sukabumi.",
    url: "https://tasyakuran-indri-luthfi.vercel.app",
    siteName: "Tasyakuran Pernikahan Lutfhi & Indri",
    images: [
      {
        url: "https://tasyakuran-indri-luthfi.vercel.app/thumbnail-il.jpg",
        width: 1200,
        height: 630,
        alt: "Tasyakuran Pernikahan Lutfhi & Indri - 31 Juli 2025",
        type: "image/jpeg",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasyakuran Pernikahan Lutfhi & Indri",
    description:
      "Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara Tasyakuran Pernikahan Lutfhi Farhan Maulana & Indri Ramdani pada Kamis, 31 Juli 2025 di Villa D'LAFISHA, Sukabumi.",
    images: ["https://tasyakuran-indri-luthfi.vercel.app/thumbnail-il.jpg"],
  },
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#143a45" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lutfhi & Indri" />
        <link rel="preload" href="/images/hero-couple.jpg" as="image" />
        <link rel="preload" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aminpalingserius-fxje76yUJ5IsjQHiVv7fWzsxI6ayXf.mp3" as="audio" />
      </head>
      <body className={inter.className}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
