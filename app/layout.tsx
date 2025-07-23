import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tasyakuran Pernikahan Lutfhi & Indri",
  description:
    "Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara Tasyakuran Pernikahan Lutfhi Farhan Maulana & Indri Ramdani pada Kamis, 31 Juli 2025 di Villa D'LAFISHA, Sukabumi.",
  keywords: "wedding, pernikahan, tasyakuran, lutfhi, indri, undangan digital, wedding invitation",
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
        url: "/thumbnail-il.jpg",
        width: 1200,
        height: 630,
        alt: "Tasyakuran Pernikahan Lutfhi & Indri - 31 Juli 2025",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasyakuran Pernikahan Lutfhi & Indri",
    description:
      "Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara Tasyakuran Pernikahan Lutfhi & Indri Ramdani pada Kamis, 31 Juli 2025 di Villa D'LAFISHA, Sukabumi.",
    images: ["/thumbnail-il.jpg"],
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
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },
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
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#143a45" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
