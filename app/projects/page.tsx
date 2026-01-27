import Link from "next/link"
import { projects } from "./projectsData"

export default function ProjectsPage() {
  const activeProjects = projects.filter(p => p.status !== 'setup-only');

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
              <Link href="/projects" className="font-semibold text-teal-600">
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

      <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900">Personal Projects</h1>
        <p className="mt-4 text-lg text-gray-600">
          A collection of my software engineering projects showcasing web development, game development, and algorithmic problem-solving skills.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {activeProjects.map((project) => (
            <div key={project.id} className="rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                {project.needsApiKeys && (
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">API Key Required</span>
                )}
                {project.status === 'incomplete' && (
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">In Progress</span>
                )}
              </div>

              <p className="mt-2 text-gray-600 text-sm">
                {project.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                    +{project.techStack.length - 3} more
                  </span>
                )}
              </div>

              <div className="mt-4 flex gap-4">
                {project.hasDemo && (
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-teal-600 hover:text-teal-500 font-medium"
                  >
                    View Project →
                  </Link>
                )}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  GitHub →
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
