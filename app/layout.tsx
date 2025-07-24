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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tasyakuran-indri-luthfi.vercel.app"),
  alternates: {
    canonical: "/",
  },
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
    creator: "@lutfhi_indri",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
      { url: "/favicon.png", sizes: "152x152", type: "image/png" },
      { url: "/favicon.png", sizes: "120x120", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lutfhi & Indri",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#143a45" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

        {/* Apple PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lutfhi & Indri" />

        {/* WhatsApp Specific Meta Tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="Tasyakuran Pernikahan Lutfhi & Indri - 31 Juli 2025" />
        <meta property="og:image" content="https://tasyakuran-indri-luthfi.vercel.app/thumbnail-il.jpg" />

        {/* Additional Meta Tags for Better Sharing */}
        <meta name="author" content="Lutfhi & Indri" />
        <meta name="copyright" content="Lutfhi & Indri Wedding 2025" />
        <meta name="language" content="Indonesian" />
        <meta name="revisit-after" content="1 days" />

        {/* Preload Critical Resources */}
        <link rel="preload" href="/images/hero-couple.jpg" as="image" />
        <link rel="preload" href="/aminpalingserius.mp3" as="audio" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
