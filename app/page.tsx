import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
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
              <Link href="/contact/booking" className="font-semibold text-teal-700 hover:text-teal-600">
                Book Me
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <Link href="/profile">
              <Image
                src="/images/profile.jpg"
                alt="Evie Marie Kolb"
                width={200}
                height={200}
                className="rounded-full border-4 border-teal-600 shadow-lg object-cover hover:border-teal-500 transition-colors"
                priority
              />
            </Link>
          </div>
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Full-Stack Software Engineer
          </h2>
          <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
            Building accessible, performant applications with React, React Native, and Node.js.
            Passionate about creating elegant solutions that make technology work for everyone.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/projects"
              className="rounded-md bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-500"
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
          <div className="rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900">Mobile & Web Development</h3>
            <p className="mt-2 text-gray-600">
              Expertise in React Native, Expo, and Unity integrations for cross-platform mobile apps, plus modern web applications with React and Next.js.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900">API & Backend Architecture</h3>
            <p className="mt-2 text-gray-600">
              Designing scalable backend services with Node.js, GraphQL, REST APIs, and database solutions using PostgreSQL, MongoDB, and Prisma.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900">Cloud & DevOps</h3>
            <p className="mt-2 text-gray-600">
              Deploying and managing applications on AWS with Docker, CI/CD pipelines, Lambda functions, and infrastructure automation.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
