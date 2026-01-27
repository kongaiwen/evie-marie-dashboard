import Link from "next/link"
import { notFound } from "next/navigation"
import { projects } from "../projectsData"
import ProjectDemo from "@/components/ProjectDemo"
import CodeViewer from "@/components/CodeViewer"
import PythonTerminal from "@/components/PythonTerminal"
import { readFile } from "fs/promises"
import path from "path"
import Script from "next/script"

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
      codeContent = '// Error loading code file';
    }
  }

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js" strategy="beforeInteractive" />
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

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-teal-600 hover:text-teal-500 mb-8"
        >
          ← Back to Projects
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-4xl font-bold text-gray-900">{project.name}</h1>
            <div className="flex gap-2">
              {project.needsApiKeys && (
                <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded">
                  API Key Required
                </span>
              )}
              {project.status === 'incomplete' && (
                <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded">
                  In Progress
                </span>
              )}
            </div>
          </div>

          <p className="text-lg text-gray-600 mb-6">{project.description}</p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-teal-50 text-teal-700 px-3 py-1 rounded-md text-sm font-medium"
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
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              View on GitHub →
            </a>
          </div>

          {project.hasDemo && (
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {project.demoType === 'code' ? 'Source Code' :
                 project.demoType === 'instructions' ? 'Setup Instructions' : 'Live Demo'}
              </h2>

              {project.demoType === 'iframe' && project.demoPath && (
                <ProjectDemo
                  projectId={project.id}
                  demoPath={project.demoPath}
                  title={project.name}
                />
              )}

              {project.demoType === 'code' && project.id === 'tic-tac-toe' && (
                <PythonTerminal
                  code={codeContent}
                  filename="tic_tac_toe.py"
                />
              )}

              {project.demoType === 'code' && project.id !== 'tic-tac-toe' && (
                <CodeViewer
                  code={codeContent}
                  language="Python"
                  filename="tic_tac_toe.py"
                />
              )}

              {project.demoType === 'instructions' && project.id === 'board-race-ting-xie' && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Running This Project Locally</h3>

                    <div className="bg-white rounded-lg p-4 mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Prerequisites:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Node.js installed</li>
                        <li>Google Cloud Vision API key</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4 mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Setup Instructions:</p>
                      <ol className="list-decimal list-inside text-gray-600 space-y-2">
                        <li>Clone the repository from GitHub</li>
                        <li>Run <code className="bg-gray-100 px-2 py-1 rounded">npm install</code></li>
                        <li>Set up Google Cloud Vision API credentials (see README)</li>
                        <li>Create a <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file with your API key</li>
                        <li>Run <code className="bg-gray-100 px-2 py-1 rounded">npm run build</code> to build the client</li>
                        <li>Run <code className="bg-gray-100 px-2 py-1 rounded">npm start</code> to start the server</li>
                        <li>Open <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000</code> in your browser</li>
                      </ol>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-amber-900 text-sm">
                        <strong>Note:</strong> This project requires a Google Cloud Vision API key to function.
                        The API analyzes handwritten characters for the drawing recognition feature.
                        Visit the GitHub repository for detailed setup instructions.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
    </>
  )
}
