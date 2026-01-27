import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Profile Photo | Evie Marie Kolb",
  description: "Profile photo of Evie Marie Kolb, Full-Stack Software Engineer",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex flex-col">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Evie Marie Kolb
            </Link>
            <div className="flex gap-6">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/projects" className="text-gray-600 hover:text-gray-900">
                Projects
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
              <Link href="/contact/booking" className="font-semibold text-teal-700 hover:text-teal-600">
                Book Me
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Image
            src="/images/profile.jpg"
            alt="Evie Marie Kolb"
            width={500}
            height={500}
            className="rounded-lg shadow-2xl object-cover mx-auto"
            priority
          />
          <h1 className="mt-8 text-3xl font-bold text-gray-900">Evie Marie Kolb</h1>
          <p className="mt-2 text-lg text-gray-600">Full-Stack Software Engineer</p>
        </div>
      </main>
    </div>
  )
}
