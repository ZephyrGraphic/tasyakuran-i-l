"use client"

import { useState, useEffect, useRef } from "react"
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Camera,
  Home,
  Users,
  Music,
  MicOffIcon as MusicOff,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  UserCheck,
  Share2,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isPlaying, setIsPlaying] = useState(false)
  const [guestName, setGuestName] = useState("")
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  const audioRef = useRef<HTMLAudioElement>(null)

  const galleryPhotos = [
    "/images/gallery-1.jpg",
    "/images/gallery-2.jpg",
    "/images/gallery-3.jpg",
    "/images/gallery-4.jpg",
    "/images/gallery-5.jpg",
    "/images/gallery-6.jpg",
    "/images/hero-couple.jpg",
    "/images/couple-white-ceremony.jpg",
    "/images/couple-white-outdoor.jpg",
  ]

  // Get guest name from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const toParam = urlParams.get("to")

    if (toParam) {
      const decodedName = decodeURIComponent(toParam)
      setGuestName(decodedName)
    } else {
      setGuestName("Tamu Undangan")
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date("2025-07-31T09:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      if (difference < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const openInvitation = () => {
    setIsOpened(true)
    setIsPlaying(true)
    setActiveSection("home")

    // Start playing music
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
        console.log("Autoplay prevented")
      })
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {
          console.log("Play prevented")
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const changeSection = (newSection: string) => {
    if (newSection === activeSection) return

    setIsTransitioning(true)
    setTimeout(() => {
      setActiveSection(newSection)
      setIsTransitioning(false)
    }, 150)
  }

  const saveToCalendar = () => {
    const startDate = "20250731T020000Z" // 09:00 WIB = 02:00 UTC
    const endDate = "20250731T080000Z" // 15:00 WIB = 08:00 UTC
    const title = "Tasyakuran Pernikahan Lutfhi & Indri"
    const details = "Villa D'LAFISHA, Kp. Cijagung Desa Gede Pangrango RT. 27 RW. 07 Kab. Sukabumi"

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}`

    window.open(googleCalendarUrl, "_blank")
  }

  const shareInvitation = async () => {
    const shareData = {
      title: "Tasyakuran Pernikahan Lutfhi & Indri",
      text: "Dengan penuh sukacita, kami mengundang Anda untuk hadir dalam acara Tasyakuran Pernikahan kami pada 31 Juli 2025",
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert("Link undangan telah disalin!")
      }
    } catch (err) {
      console.log("Error sharing:", err)
    }
  }

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    }
  }

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection guestName={guestName} />
      case "couple":
        return <CoupleSection />
      case "event":
        return <EventSection timeLeft={timeLeft} saveToCalendar={saveToCalendar} />
      case "gallery":
        return <GallerySection photos={galleryPhotos} setSelectedPhoto={setSelectedPhoto} />
      case "location":
        return <LocationSection />
      case "co-invitation":
        return <CoInvitationSection />
      default:
        return <HomeSection guestName={guestName} />
    }
  }

  if (!isOpened) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
        {!isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
            <span className="text-sm">Mode Offline - Beberapa fitur mungkin terbatas</span>
          </div>
        )}
        {/* Background Audio */}
        <audio ref={audioRef} loop>
          <source src="/aminpalingserius.mp3" type="audio/mpeg" />
        </audio>

        <div className="absolute inset-0">
          <Image
            src="/images/hero-couple.jpg"
            alt="Lutfhi & Indri"
            fill
            className="object-cover"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-sm mx-auto">
          <div className="space-y-6 animate-fade-in">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Heart className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>

            <p className="text-lg font-light tracking-wider">Tasyakuran Ngunduh Mantu</p>
            <h1 className="text-5xl font-bold font-serif mb-8 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Lutfhi & Indri
            </h1>

            <div className="space-y-2 mb-8">
              <p className="text-sm opacity-90">Kepada Yth.</p>
              <p className="text-sm opacity-90">Bapak/Ibu/Saudara/i</p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mt-4 min-h-[3rem] flex items-center justify-center border border-white/30">
                <p className="font-medium text-lg">{guestName}</p>
              </div>
            </div>

            <Button
              onClick={openInvitation}
              className="bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white px-8 py-3 rounded-full font-medium text-lg shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
            >
              <Heart className="w-5 h-5 mr-2" />
              Buka Undangan
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-slate-50 pb-20">
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
          <span className="text-sm">Mode Offline - Beberapa fitur mungkin terbatas</span>
        </div>
      )}
      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src="/aminpalingserius.mp3" type="audio/mpeg" />
      </audio>

      {/* Section Content with Transition */}
      <div
        className={`min-h-screen transition-all duration-300 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        {renderSection()}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed top-6 right-6 flex flex-col gap-3 z-50">
        <button
          onClick={toggleMusic}
          className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
        >
          {isPlaying ? <Music className="w-6 h-6" /> : <MusicOff className="w-6 h-6" />}
        </button>

        <button
          onClick={shareInvitation}
          className="bg-secondary-500 hover:bg-secondary-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
        >
          <Share2 className="w-6 h-6" />
        </button>
        {showInstallPrompt && (
          <button
            onClick={handleInstallClick}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
            title="Install App"
          >
            <Download className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Enhanced Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-2 z-40 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => changeSection("home")}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              activeSection === "home"
                ? "bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-md scale-105"
                : "text-primary-600 hover:bg-cyan-100"
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => changeSection("couple")}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              activeSection === "couple"
                ? "bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-md scale-105"
                : "text-primary-600 hover:bg-cyan-100"
            }`}
          >
            <Users className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Couple</span>
          </button>
          <button
            onClick={() => changeSection("event")}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              activeSection === "event"
                ? "bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-md scale-105"
                : "text-primary-600 hover:bg-cyan-100"
            }`}
          >
            <Calendar className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Event</span>
          </button>
          <button
            onClick={() => changeSection("gallery")}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              activeSection === "gallery"
                ? "bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-md scale-105"
                : "text-primary-600 hover:bg-cyan-100"
            }`}
          >
            <Camera className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Gallery</span>
          </button>
          <button
            onClick={() => changeSection("location")}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              activeSection === "location"
                ? "bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-md scale-105"
                : "text-primary-600 hover:bg-cyan-100"
            }`}
          >
            <MapPin className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Location</span>
          </button>
          <button
            onClick={() => changeSection("co-invitation")}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              activeSection === "co-invitation"
                ? "bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-md scale-105"
                : "text-primary-600 hover:bg-cyan-100"
            }`}
          >
            <UserCheck className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Co-Invite</span>
          </button>
        </div>
      </nav>

      {/* Enhanced Photo Lightbox */}
      {selectedPhoto !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2 backdrop-blur-sm"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={() => setSelectedPhoto(selectedPhoto > 0 ? selectedPhoto - 1 : galleryPhotos.length - 1)}
            className="absolute left-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2 backdrop-blur-sm"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={() => setSelectedPhoto(selectedPhoto < galleryPhotos.length - 1 ? selectedPhoto + 1 : 0)}
            className="absolute right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2 backdrop-blur-sm"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative max-w-4xl max-h-full">
            <Image
              src={galleryPhotos[selectedPhoto] || "/placeholder.svg"}
              alt={`Wedding Photo ${selectedPhoto + 1}`}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              loading="eager"
              quality={80}
              sizes="(max-width: 768px) 100vw, 800px"
            />

            {/* Photo counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm">
              {selectedPhoto + 1} / {galleryPhotos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function HomeSection({ guestName }: { guestName: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-couple.jpg"
          alt="Lutfhi & Indri"
          fill
          className="object-cover"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center text-white max-w-md mx-auto">
        <div className="space-y-6 animate-fade-in">
          <div className="mb-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Heart className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>

          <p className="text-lg font-light tracking-wider opacity-90">Tasyakuran Ngunduh Mantu</p>
          <h1 className="text-5xl font-bold font-serif mb-8 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Lutfhi & Indri
          </h1>

          {guestName && guestName !== "Tamu Undangan" && (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/30">
              <p className="text-sm mb-2 opacity-90">Kepada Yth. Bapak/Ibu/Saudara/i</p>
              <p className="font-medium text-lg">{guestName}</p>
            </div>
          )}

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/30">
            <p className="text-cyan-200 font-serif text-lg mb-4">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
            <p className="text-white text-sm leading-relaxed mb-4 opacity-90">
              Maha suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah, semoga ridho-Mu
              tercurah mengiringi Tasyakuran Pernikahan putra-putri kami
            </p>
            <p className="text-cyan-200 italic">"Dan dijadikan-Nya diantaramu rasa kasih dan sayang"</p>
            <p className="text-cyan-300 text-sm mt-2">- QS. Ar-Rum: 21 -</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function CoupleSection() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Floral Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/floral-element.png"
          alt="Floral decoration"
          fill
          className="object-cover opacity-20"
          priority={false}
        />
      </div>

      <div className="max-w-md mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-primary-600 font-serif">Kedua Mempelai</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-12">
          {/* Groom */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full transform -rotate-6"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/images/luthfi.jpg"
                  alt="Lutfhi Farhan Maulana"
                  fill
                  className="object-cover"
                  quality={80}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full flex items-center justify-center border-4 border-white">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-primary-600 font-serif">Lutfhi Farhan Maulana, S.Pd.</h3>
              <p className="text-gray-700 leading-relaxed">
                Putra pertama dari
                <br />
                <span className="font-medium">Bapak Asep Badrutamam & Ibu Heni Suarni</span>
              </p>
            </div>
          </div>

          {/* Heart Divider */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-secondary-500"></div>
              <Heart className="w-8 h-8 text-secondary-500 animate-pulse" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-secondary-500"></div>
            </div>
          </div>

          {/* Bride */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-200 to-teal-200 rounded-full transform rotate-6"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/images/indri.jpg"
                  alt="Indri Ramdani"
                  fill
                  className="object-cover"
                  quality={80}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-r from-secondary-500 to-primary-600 rounded-full flex items-center justify-center border-4 border-white">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-primary-600 font-serif">Indri Ramdani, S.Pd.</h3>
              <p className="text-gray-700 leading-relaxed">
                Putri kedua dari
                <br />
                <span className="font-medium">Bapak Isap Saprudin & Ibu Uu Yuningsih</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EventSection({
  timeLeft,
  saveToCalendar,
}: {
  timeLeft: { days: number; hours: number; minutes: number; seconds: number }
  saveToCalendar: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white relative overflow-hidden">
      {/* Floral Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/floral-element.png"
          alt="Floral decoration"
          fill
          className="object-cover opacity-15"
          priority={false}
        />
      </div>

      <div className="max-w-md mx-auto w-full relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-primary-600 font-serif">Detail Acara</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-6">
          {/* Akad Nikah */}
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-secondary-200 backdrop-blur-sm bg-white/80 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full flex items-center justify-center mr-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary-600">Akad Nikah</h3>
            </div>
            <div className="space-y-2 text-gray-700">
              <p className="font-medium">Minggu, 13 Juli 2025</p>
              <p className="text-sm italic text-green-600">(Telah Dilaksanakan)</p>
            </div>
          </div>

          {/* Tasyakuran */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-purple-200 backdrop-blur-sm bg-white/80 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-800">Tasyakuran Pernikahan</h3>
            </div>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium">Kamis, 31 Juli 2025</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-purple-600 mr-2" />
                <span>09.00 - 15.00 WIB</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-purple-600 mr-2 mt-1" />
                <div>
                  <p className="font-medium">Villa D'LAFISHA</p>
                  <p className="text-sm">
                    Kp. Cijagung Desa Gede Pangrango
                    <br />
                    RT. 27 RW. 07 Kab. Sukabumi
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-gradient-to-r from-cyan-100 to-teal-100 rounded-2xl p-6 text-center backdrop-blur-sm bg-white/80 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Menuju Hari Bahagia</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { value: timeLeft.days, label: "Hari" },
                { value: timeLeft.hours, label: "Jam" },
                { value: timeLeft.minutes, label: "Menit" },
                { value: timeLeft.seconds, label: "Detik" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 shadow-md transform hover:scale-105 transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-secondary-500">{item.value}</div>
                  <div className="text-xs text-gray-600 font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Save the Date Button */}
          <div className="text-center">
            <Button
              onClick={saveToCalendar}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Save the Date
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function GallerySection({
  photos,
  setSelectedPhoto,
}: {
  photos: string[]
  setSelectedPhoto: (index: number) => void
}) {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 to-rose-50 relative overflow-hidden">
      {/* Floral Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/floral-element.png"
          alt="Floral decoration"
          fill
          className="object-cover opacity-20"
          priority={false}
        />
      </div>

      <div className="max-w-md mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full flex items-center justify-center">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-primary-600 font-serif">Galeri Foto</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`relative cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                index % 3 === 0 ? "row-span-2" : ""
              }`}
              onClick={() => setSelectedPhoto(index)}
            >
              <div className={`relative rounded-xl overflow-hidden shadow-lg ${index % 3 === 0 ? "h-64" : "h-32"}`}>
                <Image
                  src={photo || "/placeholder.svg"}
                  alt={`Wedding Photo ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  loading={index < 4 ? "eager" : "lazy"}
                  quality={80}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LocationSection() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white relative overflow-hidden">
      {/* Floral Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/floral-element.png"
          alt="Floral decoration"
          fill
          className="object-cover opacity-15"
          priority={false}
        />
      </div>

      <div className="max-w-md mx-auto w-full relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full flex items-center justify-center">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-primary-600 font-serif">Lokasi Acara</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-secondary-200 backdrop-blur-sm bg-white/80 transform hover:scale-105 transition-all duration-300">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-primary-600 mb-2">Villa D'LAFISHA</h3>
              <p className="text-gray-700 leading-relaxed">
                Kp. Cijagung Desa Gede Pangrango
                <br />
                RT. 27 RW. 07 Kab. Sukabumi
                <br />
                <span className="font-medium">Jawa Barat</span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d416.3855024500915!2d106.92401232531084!3d-6.848722971509604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e684b002e63a777%3A0x2e4e0804d7c6bb5e!2sVILLA%20D'LAVISHA!5e0!3m2!1sen!2sid!4v1752933000979!5m2!1sen!2sid"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="text-center">
            <a
              href="https://maps.app.goo.gl/CA1o25owk3P7t3AKA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Buka di Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function CoInvitationSection() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-cyan-50 to-slate-50 relative overflow-hidden">
      {/* Floral Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/floral-element.png"
          alt="Floral decoration"
          fill
          className="object-cover opacity-20"
          priority={false}
        />
      </div>

      <div className="max-w-md mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full flex items-center justify-center">
            <UserCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-primary-600 font-serif">Turut Mengundang</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-secondary-200 backdrop-blur-sm bg-white/90 mb-8">
          <div className="space-y-3 text-gray-700 text-sm">
            {[
              "Bpk. Susandikrillah, S.IP., M.AP (Camat Kadudampit)",
              "Kel. Besar Yayasan Al Mukhlist",
              "Kel. Besar YASPI Al Fadlah",
              "Kel. Besar Alm. Bapak Indi Tatjwindi & Ibu Hindu",
              "Kel. Besar Alm. Bapak Holil Umi leih",
              "Kel. Besar Alm. Bapak H.Dadang",
              "Kel. Besar Alm. Bapak Ajid",
              "Kel. Besar SDN Cicohag",
              "Kel. Besar SDN Gentong",
            ].map((item, index) => (
              <p key={index} className="flex items-center">
                <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3 flex-shrink-0"></span>
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="text-center space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-secondary-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir untuk
              memberikan do'a restu kepada kedua mempelai.
            </p>

            <p className="text-primary-600 font-serif text-lg mb-4">Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-primary-600 font-serif">Lutfhi & Indri</h3>
              <div className="text-gray-600 text-sm space-y-1">
                <p>Keluarga Besar Bapak Asep Badrutamam & Ibu Heni Suarni</p>
                <p>Keluarga Besar Bapak Isap Saprudin & Ibu Uu Yuningsih</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-secondary-500"></div>
            <Heart className="w-8 h-8 text-secondary-500 animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-secondary-500"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
