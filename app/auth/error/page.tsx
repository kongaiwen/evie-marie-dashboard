import Link from "next/link"

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600">
            Authentication Error
          </h2>
          <p className="mt-4 text-gray-600">
            {searchParams.error === "AccessDenied"
              ? "You are not authorized to access this application."
              : "An error occurred during authentication."}
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
