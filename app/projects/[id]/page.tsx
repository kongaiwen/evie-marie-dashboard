import Link from "next/link"
import { notFound } from "next/navigation"
import { projects } from "../projectsData"
import { readFile } from "fs/promises"
import path from "path"

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  let codeContent = '';
  if (project.demoType === 'code' && project.id === 'tic-tac-toe') {
    try {
      const filePath = path.join(process.cwd(), 'repos', 'tic-tac-toe', 'tic_tac_toe.py');
      codeContent = await readFile(filePath, 'utf-8');
    } catch (error) {
      codeContent = '# Error loading code file';
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
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
              <Link href="/projects" className="text-teal-600 font-semibold">
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

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-teal-600 hover:text-teal-500 mb-8"
        >
          ← Back to Projects
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-6">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold text-white">{project.name}</h1>
              <div className="flex gap-2">
                {project.needsApiKeys && (
                  <span className="text-xs bg-amber-400 text-amber-900 px-3 py-1 rounded-full font-medium">
                    API Key Required
                  </span>
                )}
              </div>
            </div>
            <p className="mt-3 text-teal-100">{project.description}</p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium border border-teal-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
            </div>

            {project.hasDemo && (
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {project.demoType === 'code' ? 'Source Code' :
                   project.demoType === 'instructions' ? 'Setup Instructions' : 'Live Demo'}
                </h2>

                {project.demoType === 'iframe' && project.demoPath && (
                  <div className="rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
                    <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-gray-400 text-sm ml-2">{project.name}</span>
                    </div>
                    <iframe
                      src={project.demoPath}
                      className="w-full bg-white"
                      style={{ height: '600px' }}
                      title={`${project.name} Demo`}
                    />
                  </div>
                )}

                {project.demoType === 'code' && project.id === 'tic-tac-toe' && (
                  <div className="rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
                    <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-gray-400 text-sm ml-2">tic_tac_toe.py</span>
                      </div>
                      <span className="text-xs bg-yellow-500 text-yellow-900 px-2 py-1 rounded font-medium">Python</span>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-6 overflow-auto text-sm leading-relaxed" style={{ maxHeight: '500px' }}>
                      <code>{codeContent}</code>
                    </pre>
                    <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
                      <p className="text-gray-400 text-sm">
                        Run this game locally: <code className="bg-gray-700 px-2 py-1 rounded text-teal-400">python tic_tac_toe.py</code>
                      </p>
                    </div>
                  </div>
                )}

                {project.demoType === 'instructions' && project.id === 'board-race-ting-xie' && (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <span className="text-2xl">🚀</span> Running This Project Locally
                    </h3>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                          Prerequisites
                        </h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-center gap-2">
                            <span className="text-teal-500">✓</span> Node.js installed
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-teal-500">✓</span> Google Cloud Vision API key
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                          Quick Start
                        </h4>
                        <div className="space-y-2 font-mono text-sm">
                          <div className="bg-gray-800 text-gray-100 px-3 py-2 rounded">git clone {project.repoUrl}</div>
                          <div className="bg-gray-800 text-gray-100 px-3 py-2 rounded">npm install</div>
                          <div className="bg-gray-800 text-gray-100 px-3 py-2 rounded">npm run build && npm start</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <p className="text-amber-800 text-sm flex items-start gap-2">
                        <span className="text-lg">⚠️</span>
                        <span>
                          <strong>Note:</strong> This project requires a Google Cloud Vision API key for the handwriting recognition feature.
                          See the GitHub README for detailed setup instructions.
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
