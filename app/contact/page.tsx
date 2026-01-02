import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
              <Link href="/contact" className="font-semibold text-indigo-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900">Get in Touch</h1>
        <p className="mt-4 text-lg text-gray-600">
          Add your contact information, social links, or a contact form here.
        </p>

        <div className="mt-12 space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">Email</h3>
            <p className="mt-2 text-gray-600">your.email@example.com</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">Social</h3>
            <div className="mt-2 space-y-2">
              <p className="text-gray-600">GitHub: @yourusername</p>
              <p className="text-gray-600">LinkedIn: @yourusername</p>
              <p className="text-gray-600">Twitter: @yourusername</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
