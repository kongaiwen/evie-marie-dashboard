import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Evie Marie Kolb</h1>
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
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Software Developer & Engineer
          </h2>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Building elegant solutions to complex problems.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/projects"
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Full-Stack Development</h3>
            <p className="mt-2 text-gray-600">
              Building modern web applications with React, Next.js, and Node.js
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">API Design</h3>
            <p className="mt-2 text-gray-600">
              Creating scalable and maintainable backend services
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Cloud Infrastructure</h3>
            <p className="mt-2 text-gray-600">
              Deploying and managing applications on modern cloud platforms
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
