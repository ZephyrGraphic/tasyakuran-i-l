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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#143a45" />

        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lutfhi & Indri" />

        {/* Enhanced OpenGraph Meta Tags for WhatsApp */}
        <meta property="og:title" content="Tasyakuran Pernikahan Lutfhi & Indri" />
        <meta
          property="og:description"
          content="Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara Tasyakuran Pernikahan Lutfhi Farhan Maulana & Indri Ramdani pada Kamis, 31 Juli 2025 di Villa D'LAFISHA, Sukabumi."
        />
        <meta property="og:image" content="https://tasyakuran-indri-luthfi.vercel.app/thumbnail-il.jpg" />
        <meta property="og:image:secure_url" content="https://tasyakuran-indri-luthfi.vercel.app/thumbnail-il.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Tasyakuran Pernikahan Lutfhi & Indri - 31 Juli 2025" />
        <meta property="og:url" content="https://tasyakuran-indri-luthfi.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tasyakuran Pernikahan Lutfhi & Indri" />
        <meta property="og:locale" content="id_ID" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tasyakuran Pernikahan Lutfhi & Indri" />
        <meta
          name="twitter:description"
          content="Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara Tasyakuran Pernikahan Lutfhi Farhan Maulana & Indri Ramdani pada Kamis, 31 Juli 2025 di Villa D'LAFISHA, Sukabumi."
        />
        <meta name="twitter:image" content="https://tasyakuran-indri-luthfi.vercel.app/thumbnail-il.jpg" />
        <meta name="twitter:image:alt" content="Tasyakuran Pernikahan Lutfhi & Indri - 31 Juli 2025" />

        {/* WhatsApp Specific Meta Tags */}
        <meta property="og:image:url" content="https://tasyakuran-indri-luthfi.vercel.app/thumbnail-il.jpg" />
        <meta name="image" content="https://tasyakuran-indri-luthfi.vercel.app/thumbnail-il.jpg" />
        <meta name="thumbnail" content="https://tasyakuran-indri-luthfi.vercel.app/thumbnail-il.jpg" />

        {/* Additional Meta Tags for Better Compatibility */}
        <meta name="author" content="Lutfhi & Indri" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="slurp" content="index, follow" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://tasyakuran-indri-luthfi.vercel.app" />

        {/* Preload Critical Resources */}
        <link rel="preload" href="/images/hero-couple.jpg" as="image" />
        <link rel="preload" href="/thumbnail-il.jpg" as="image" />
        <link rel="preload" href="/aminpalingserius.mp3" as="audio" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//maps.googleapis.com" />
        <link rel="dns-prefetch" href="//calendar.google.com" />
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
