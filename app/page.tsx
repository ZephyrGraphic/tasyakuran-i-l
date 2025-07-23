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

  const openInvitation = () => {
    setIsOpened(true)
    setIsPlaying(true)
    setActiveSection("home")

    // Start playing music
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const saveToCalendar = () => {
    const startDate = "20250731T020000Z" // 09:00 WIB = 02:00 UTC
    const endDate = "20250731T080000Z" // 15:00 WIB = 08:00 UTC
    const title = "Tasyakuran Pernikahan Lutfhi & Indri"
    const details = "Villa D'LAFISHA, Kp. Cijagung Desa Gede Pangrango RT. 27 RW. 07 Kab. Sukabumi"

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}`

    window.open(googleCalendarUrl, "_blank")
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
        {/* Background Audio */}
        <audio ref={audioRef} loop>
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aminpalingserius-fxje76yUJ5IsjQHiVv7fWzsxI6ayXf.mp3" type="audio/mpeg" />
        </audio>

        <div className="absolute inset-0">
          <Image src="/images/hero-couple.jpg" alt="Lutfhi & Indri" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-sm mx-auto">
          <div className="space-y-6 animate-fade-in">
            <p className="text-lg font-light tracking-wider">Tasyakuran Ngunduh Mantu</p>
            <h1 className="text-5xl font-bold font-serif mb-8">Lutfhi & Indri</h1>

            <div className="space-y-2 mb-8">
              <p className="text-sm">Kepada Yth.</p>
              <p className="text-sm">Bapak/Ibu/Saudara/i</p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mt-4 min-h-[3rem] flex items-center justify-center">
                <p className="font-medium text-lg">{guestName}</p>
              </div>
            </div>

            <Button
              onClick={openInvitation}
              className="bg-white/90 hover:bg-white text-gray-800 px-8 py-3 rounded-full font-medium text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Buka Undangan
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-slate-50 pb-20">
      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aminpalingserius-fxje76yUJ5IsjQHiVv7fWzsxI6ayXf.mp3" type="audio/mpeg" />
      </audio>

      {/* Section Content */}
      <div className="min-h-screen">{renderSection()}</div>

      {/* Floating Music Control */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg z-50 transform hover:scale-110 transition-all duration-300"
      >
        {isPlaying ? <Music className="w-6 h-6" /> : <MusicOff className="w-6 h-6" />}
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-2 py-2 z-40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => setActiveSection("home")}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              activeSection === "home" ? "bg-primary-600 text-white shadow-md" : "text-primary-600 hover:bg-cyan-100"
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveSection("couple")}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              activeSection === "couple" ? "bg-primary-600 text-white shadow-md" : "text-primary-600 hover:bg-cyan-100"
            }`}
          >
            <Users className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Couple</span>
          </button>
          <button
            onClick={() => setActiveSection("event")}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              activeSection === "event" ? "bg-primary-600 text-white shadow-md" : "text-primary-600 hover:bg-cyan-100"
            }`}
          >
            <Calendar className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Event</span>
          </button>
          <button
            onClick={() => setActiveSection("gallery")}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              activeSection === "gallery" ? "bg-primary-600 text-white shadow-md" : "text-primary-600 hover:bg-cyan-100"
            }`}
          >
            <Camera className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Gallery</span>
          </button>
          <button
            onClick={() => setActiveSection("location")}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              activeSection === "location"
                ? "bg-primary-600 text-white shadow-md"
                : "text-primary-600 hover:bg-cyan-100"
            }`}
          >
            <MapPin className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Location</span>
          </button>
          <button
            onClick={() => setActiveSection("co-invitation")}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              activeSection === "co-invitation"
                ? "bg-primary-600 text-white shadow-md"
                : "text-primary-600 hover:bg-cyan-100"
            }`}
          >
            <UserCheck className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Co-Invite</span>
          </button>
        </div>
      </nav>

      {/* Photo Lightbox */}
      {selectedPhoto !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={() => setSelectedPhoto(selectedPhoto > 0 ? selectedPhoto - 1 : galleryPhotos.length - 1)}
            className="absolute left-4 text-white hover:text-gray-300 z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={() => setSelectedPhoto(selectedPhoto < galleryPhotos.length - 1 ? selectedPhoto + 1 : 0)}
            className="absolute right-4 text-white hover:text-gray-300 z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative max-w-4xl max-h-full">
            <Image
              src={galleryPhotos[selectedPhoto] || "/placeholder.svg"}
              alt={`Wedding Photo ${selectedPhoto + 1}`}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
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
        <Image src="/images/hero-couple.jpg" alt="Lutfhi & Indri" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center text-white max-w-md mx-auto">
        <div className="space-y-6">
          <p className="text-lg font-light tracking-wider">Tasyakuran Ngunduh Mantu</p>
          <h1 className="text-5xl font-bold font-serif mb-8">Lutfhi & Indri</h1>

          {guestName && guestName !== "Tamu Undangan" && (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
              <p className="text-sm mb-2">Kepada Yth. Bapak/Ibu/Saudara/i</p>
              <p className="font-medium text-lg">{guestName}</p>
            </div>
          )}

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
            <p className="text-cyan-200 font-serif text-lg mb-4">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
            <p className="text-white text-sm leading-relaxed mb-4">
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
        <h2 className="text-4xl font-bold text-center text-primary-600 font-serif mb-12">Kedua Mempelai</h2>

        <div className="space-y-12">
          {/* Groom */}
          <div className="text-center space-y-6">
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full transform -rotate-6"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image src="/images/luthfi.jpg" alt="Lutfhi Farhan Maulana" fill className="object-cover" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-primary-600 font-serif">Lutfhi Farhan Maulana, S.Pd.</h3>
              <p className="text-gray-700">
                Putra pertama dari
                <br />
                Bapak Asep Badrutamam & Ibu Heni Suarni
              </p>
            </div>
          </div>

          {/* Heart Divider */}
          <div className="text-center">
            <Heart className="w-8 h-8 text-secondary-500 mx-auto" />
          </div>

          {/* Bride */}
          <div className="text-center space-y-6">
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-200 to-teal-200 rounded-full transform rotate-6"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image src="/images/indri.jpg" alt="Indri Ramdani" fill className="object-cover" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-primary-600 font-serif">Indri Ramdani, S.Pd.</h3>
              <p className="text-gray-700">
                Putri kedua dari
                <br />
                Bapak Isap Saprudin & Ibu Uu Yuningsih
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
        <h2 className="text-4xl font-bold text-center text-primary-600 font-serif mb-8">Detail Acara</h2>

        <div className="space-y-6">
          {/* Akad Nikah */}
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-secondary-200 backdrop-blur-sm bg-white/80">
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 text-primary-600 mr-3" />
              <h3 className="text-xl font-bold text-primary-600">Akad Nikah</h3>
            </div>
            <div className="space-y-2 text-gray-700">
              <p className="font-medium">Minggu, 13 Juli 2025</p>
              <p className="text-sm italic">(Telah Dilaksanakan)</p>
            </div>
          </div>

          {/* Tasyakuran */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-purple-200 backdrop-blur-sm bg-white/80">
            <div className="flex items-center mb-4">
              <Calendar className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-xl font-bold text-purple-800">Tasyakuran Pernikahan</h3>
            </div>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                <span>Kamis, 31 Juli 2025</span>
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
          <div className="bg-gradient-to-r from-cyan-100 to-teal-100 rounded-2xl p-6 text-center backdrop-blur-sm bg-white/80">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Menuju Hari Bahagia</h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-white rounded-lg p-3 shadow-md">
                <div className="text-2xl font-bold text-secondary-500">{timeLeft.days}</div>
                <div className="text-xs text-gray-600">Hari</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-md">
                <div className="text-2xl font-bold text-secondary-500">{timeLeft.hours}</div>
                <div className="text-xs text-gray-600">Jam</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-md">
                <div className="text-2xl font-bold text-secondary-500">{timeLeft.minutes}</div>
                <div className="text-xs text-gray-600">Menit</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-md">
                <div className="text-2xl font-bold text-secondary-500">{timeLeft.seconds}</div>
                <div className="text-xs text-gray-600">Detik</div>
              </div>
            </div>
          </div>

          {/* Save the Date Button */}
          <div className="text-center">
            <Button
              onClick={saveToCalendar}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transform hover:scale-105 transition-all duration-300"
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
        <h2 className="text-4xl font-bold text-center text-primary-600 font-serif mb-8">Galeri Foto</h2>

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
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
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
        <h2 className="text-4xl font-bold text-center text-primary-600 font-serif mb-8">Lokasi Acara</h2>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-secondary-200 backdrop-blur-sm bg-white/80">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-primary-600 mb-2">Villa D'LAFISHA</h3>
              <p className="text-gray-700">
                Kp. Cijagung Desa Gede Pangrango
                <br />
                RT. 27 RW. 07 Kab. Sukabumi
                <br />
                Jawa Barat
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
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
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transform hover:scale-105 transition-all duration-300"
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
        <h2 className="text-4xl font-bold text-center text-primary-600 font-serif mb-8">Turut Mengundang</h2>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-secondary-200 backdrop-blur-sm bg-white/90">
          <div className="space-y-3 text-gray-700 text-sm">
            <p>• Bpk. Susandikrillah, S.IP., M.AP (Camat Kadudampit)</p>
            <p>• Kel. Besar Yayasan Al Mukhlist</p>
            <p>• Kel. Besar YASPI Al Fadlah</p>
            <p>• Kel. Besar Alm. Bapak Indi Tatjwindi & Ibu Hindu</p>
            <p>• Kel. Besar Alm. Bapak Holil Umi leih</p>
            <p>• Kel. Besar Alm. Bapak H.Dadang</p>
            <p>• Kel. Besar Alm. Bapak Ajid</p>
            <p>• Kel. Besar SDN Cicohag</p>
            <p>• Kel. Besar SDN Gentong</p>
          </div>
        </div>

        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir untuk
            memberikan do'a restu kepada kedua mempelai.
          </p>

          <p className="text-primary-600 font-serif text-lg">Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-primary-600 font-serif">Lutfhi & Indri</h3>
            <div className="text-gray-600 text-sm space-y-1">
              <p>Keluarga Besar Bapak Asep Badrutamam & Ibu Heni Suarni</p>
              <p>Keluarga Besar Bapak Isap Saprudin & Ibu Uu Yuningsih</p>
            </div>
          </div>

          <Heart className="w-8 h-8 text-secondary-500 mx-auto" />
        </div>
      </div>
    </div>
  )
}
