import Link from "next/link"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Your Name
            </Link>
            <div className="flex gap-6">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/projects" className="font-semibold text-indigo-600">
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
        <h1 className="text-4xl font-bold text-gray-900">My Projects</h1>
        <p className="mt-4 text-lg text-gray-600">
          Showcase your best work here. Add project cards, demos, and links to live sites or repositories.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">Project 1</h3>
            <p className="mt-2 text-gray-600">
              Description of your first project. Add technologies used, challenges solved, etc.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Live Demo →
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                GitHub →
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">Project 2</h3>
            <p className="mt-2 text-gray-600">
              Description of your second project.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Live Demo →
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                GitHub →
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">Project 3</h3>
            <p className="mt-2 text-gray-600">
              Description of your third project.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Live Demo →
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                GitHub →
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
