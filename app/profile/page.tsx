import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Profile Photo | Evie Marie Kolb",
  description: "Profile photo of Evie Marie Kolb, Full-Stack Software Engineer",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-teal-100 bg-white/70 backdrop-blur-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Evie Marie Kolb</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/about" className="text-gray-600 hover:text-teal-600 transition-colors">
                About
              </Link>
              <Link href="/projects" className="text-gray-600 hover:text-teal-600 transition-colors">
                Projects
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-teal-600 transition-colors">
                Contact
              </Link>
              <Link
                href="/contact/booking"
                className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-teal-200 transition-all"
              >
                Book Me
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl blur-lg opacity-20"></div>
            <Image
              src="/images/profile.jpg"
              alt="Evie Marie Kolb"
              width={400}
              height={400}
              className="relative rounded-2xl shadow-2xl object-cover"
              priority
            />
          </div>
          <h1 className="mt-8 text-3xl font-bold text-gray-900">Evie Marie Kolb</h1>
          <p className="mt-2 text-lg text-gray-600">Full-Stack Software Engineer</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/about"
              className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
            >
              Learn more about me
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
