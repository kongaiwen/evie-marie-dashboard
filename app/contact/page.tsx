import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
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
              <Link href="/contact" className="font-semibold text-teal-600">
                Contact
              </Link>
              <Link href="/contact/booking" className="font-semibold text-teal-700 hover:text-teal-600">
                Book Me
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900">Get in Touch</h1>
        <p className="mt-4 text-lg text-gray-600">
          I'm always interested in hearing about new opportunities, interesting projects,
          or just connecting with fellow developers. Feel free to reach out!
        </p>

        <div className="mt-12 space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">Email</h3>
            <a
              href="mailto:eviemariekolb@gmail.com"
              className="mt-2 block text-teal-600 hover:text-teal-500"
            >
              eviemariekolb@gmail.com
            </a>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">Social</h3>
            <div className="mt-2 space-y-2">
              <a
                href="https://github.com/kongaiwen"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-teal-600 hover:text-teal-500"
              >
                GitHub: @kongaiwen →
              </a>
              <a
                href="https://linkedin.com/in/evie-marie-kolb"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-teal-600 hover:text-teal-500"
              >
                LinkedIn: evie-marie-kolb →
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">Location</h3>
            <p className="mt-2 text-gray-600">
              Available for remote positions and open to relocation opportunities.
            </p>
          </div>

          <div className="rounded-lg bg-teal-600 p-6 shadow-md text-white">
            <h3 className="text-xl font-semibold">Ready to schedule a call?</h3>
            <p className="mt-2 text-teal-100">
              Book a time that works for you and let's chat about your project or opportunity.
            </p>
            <Link
              href="/contact/booking"
              className="mt-4 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-teal-600 shadow-sm hover:bg-teal-50"
            >
              Book a Meeting →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
