import Link from "next/link"
import Image from "next/image"

export default function Home() {
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

      <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <Link href="/profile" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <Image
                src="/images/profile.jpg"
                alt="Evie Marie Kolb"
                width={180}
                height={180}
                className="relative rounded-full border-4 border-white shadow-xl object-cover group-hover:scale-105 transition-transform"
                priority
              />
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-teal-700 text-sm font-medium">Available for opportunities</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-clip-text">
            Full-Stack Software Engineer
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
            Building accessible, performant applications with React, React Native, and Node.js.
            Passionate about creating elegant solutions that make technology work for everyone.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/projects"
              className="group bg-gradient-to-r from-teal-500 to-emerald-600 px-8 py-4 text-sm font-semibold text-white rounded-xl shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300 transition-all flex items-center gap-2"
            >
              View My Work
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 text-sm font-semibold text-gray-700 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-all"
            >
              Get in touch
            </Link>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-center text-sm font-semibold text-teal-600 tracking-wider uppercase mb-8">What I Do</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-teal-200 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile & Web Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Expertise in React Native, Expo, and Unity integrations for cross-platform mobile apps, plus modern web applications with React and Next.js.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-teal-200 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">API & Backend Architecture</h3>
              <p className="text-gray-600 leading-relaxed">
                Designing scalable backend services with Node.js, GraphQL, REST APIs, and database solutions using PostgreSQL, MongoDB, and Prisma.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-teal-200 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cloud & DevOps</h3>
              <p className="text-gray-600 leading-relaxed">
                Deploying and managing applications on AWS with Docker, CI/CD pipelines, Lambda functions, and infrastructure automation.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-6 bg-white rounded-2xl px-8 py-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">5+</div>
              <div className="text-sm text-gray-500">Years Experience</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">3</div>
              <div className="text-sm text-gray-500">Companies</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">React</div>
              <div className="text-sm text-gray-500">Specialist</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-teal-100 bg-white/50 mt-20">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm">© 2025 Evie Marie Kolb. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="https://github.com/kongaiwen" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://linkedin.com/in/evie-marie-kolb" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
