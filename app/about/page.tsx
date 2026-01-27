import Link from "next/link"
import Image from "next/image"

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
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-shrink-0">
            <Image
              src="/images/profile.jpg"
              alt="Evie Marie Kolb"
              width={280}
              height={280}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">About Me</h1>
            <div className="mt-8 space-y-6 text-lg text-gray-600">
              <p>
                I'm a Full-Stack Software Engineer with 5+ years of experience building
                web and mobile applications. I specialize in React, React Native, and Node.js,
                with a focus on creating accessible, performant solutions that solve real problems.
              </p>
              <p>
                Most recently, I worked at <strong>GoodMaps</strong> as a Front End Engineer II,
                where I architected a custom text-to-speech library for accessible navigation and
                led a major architectural refactor migrating the codebase to a modern React patterns
                with Zustand state management. I also managed complex Expo and React Native upgrades
                involving Unity integrations.
              </p>
              <p>
                Before that, at <strong>Switcher Studio</strong>, I owned the prototype for an
                embeddable video player with live streaming, Shopify integration, and Stripe-powered
                gated content. At <strong>borderless</strong>, I led engineering teams, conducted
                technical interviews, and managed deployments across AWS, Netlify, and CI/CD pipelines.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Background</h2>
          <div className="mt-6 space-y-6 text-lg text-gray-600">
            <p>
              My path to software engineering wasn't traditional. I graduated from Indiana University
              with a B.A. in East Asian Languages & Cultures, focusing on Mandarin Chinese. I then
              spent five years as a Mandarin-qualified Flight Attendant at United Airlines, traveling
              the world and developing strong communication and problem-solving skills.
            </p>
            <p>
              In 2020, I made the leap into tech through Hack Reactor's Advanced Software Engineering
              Program. The combination of my language learning experience, multicultural background,
              and newfound technical skills gives me a unique perspective on building software that
              works for diverse users.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Technical Skills</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="font-semibold text-gray-900">Languages</h3>
              <p className="mt-2 text-gray-600">TypeScript, JavaScript, C#/.NET, Python, Bash</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="font-semibold text-gray-900">Front-End</h3>
              <p className="mt-2 text-gray-600">React, React Native, Expo, Next.js, Redux, Zustand, GraphQL</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="font-semibold text-gray-900">Back-End</h3>
              <p className="mt-2 text-gray-600">Node.js, GraphQL, REST APIs, Prisma, PostgreSQL, MongoDB</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="font-semibold text-gray-900">Tools & Infrastructure</h3>
              <p className="mt-2 text-gray-600">Git, Docker, AWS, Stripe, Shopify, CircleCI, Unity</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
