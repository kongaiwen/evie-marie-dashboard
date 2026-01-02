import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Evie Marie Kolb
            </Link>
            <div className="flex gap-6">
              <Link href="/about" className="font-semibold text-indigo-600">
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

      <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900">About Me</h1>
        <div className="mt-8 space-y-6 text-lg text-gray-600">
          <p>
            Add your bio and background information here. Talk about your
            experience, skills, and what drives you as a developer.
          </p>
          <p>
            This is a placeholder page - customize it with your own content,
            images, and style to showcase your unique story.
          </p>
        </div>
      </main>
    </div>
  )
}
