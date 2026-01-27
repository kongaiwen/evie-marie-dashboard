import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
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
              <Link href="/about" className="text-teal-600 font-semibold">
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

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-600 px-8 py-12 text-center">
            <Link href="/profile" className="inline-block group">
              <div className="relative">
                <div className="absolute -inset-1 bg-white/30 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <Image
                  src="/images/profile.jpg"
                  alt="Evie Marie Kolb"
                  width={160}
                  height={160}
                  className="relative rounded-full border-4 border-white shadow-xl object-cover"
                />
              </div>
            </Link>
            <h1 className="mt-6 text-3xl font-bold text-white">About Me</h1>
          </div>

          <div className="p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed">
                I'm a Full-Stack Software Engineer with 5+ years of experience building
                web and mobile applications. I specialize in React, React Native, and Node.js,
                with a focus on creating accessible, performant solutions that solve real problems.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                Professional Experience
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-teal-500 pl-6">
                  <h3 className="font-semibold text-gray-900">GoodMaps - Front End Engineer II</h3>
                  <p className="text-sm text-teal-600 mb-2">2024 - 2025</p>
                  <p className="text-gray-600">
                    Architected a custom text-to-speech library for accessible navigation and
                    led a major architectural refactor migrating the codebase to modern React patterns
                    with Zustand state management. Managed complex Expo and React Native upgrades
                    involving Unity integrations.
                  </p>
                </div>

                <div className="border-l-4 border-emerald-500 pl-6">
                  <h3 className="font-semibold text-gray-900">Switcher Studio - Software Engineer</h3>
                  <p className="text-sm text-teal-600 mb-2">2022 - 2024</p>
                  <p className="text-gray-600">
                    Owned the prototype for an embeddable video player with live streaming,
                    Shopify integration, and Stripe-powered gated content. Created custom hooks
                    and standardized component libraries.
                  </p>
                </div>

                <div className="border-l-4 border-cyan-500 pl-6">
                  <h3 className="font-semibold text-gray-900">borderless - Software Engineer</h3>
                  <p className="text-sm text-teal-600 mb-2">2020 - 2022</p>
                  <p className="text-gray-600">
                    Led engineering teams, conducted technical interviews, and managed deployments
                    across AWS, Netlify, and CI/CD pipelines. Built user interfaces for payment
                    features and third-party API integrations.
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                Background
              </h2>
              <p className="text-gray-600 leading-relaxed">
                My path to software engineering wasn't traditional. I graduated from Indiana University
                with a B.A. in East Asian Languages & Cultures, focusing on Mandarin Chinese. I then
                spent five years as a Mandarin-qualified Flight Attendant at United Airlines, traveling
                the world and developing strong communication and problem-solving skills.
              </p>
              <p className="text-gray-600 leading-relaxed">
                In 2020, I made the leap into tech through Hack Reactor's Advanced Software Engineering
                Program. The combination of my language learning experience, multicultural background,
                and newfound technical skills gives me a unique perspective on building software that
                works for diverse users.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Technical Skills</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Languages</h3>
              </div>
              <p className="text-gray-600">TypeScript, JavaScript, C#/.NET, Python, Bash</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Front-End</h3>
              </div>
              <p className="text-gray-600">React, React Native, Expo, Next.js, Redux, Zustand, GraphQL</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Back-End</h3>
              </div>
              <p className="text-gray-600">Node.js, GraphQL, REST APIs, Prisma, PostgreSQL, MongoDB</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Tools & Infrastructure</h3>
              </div>
              <p className="text-gray-600">Git, Docker, AWS, Stripe, Shopify, CircleCI, Unity</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
