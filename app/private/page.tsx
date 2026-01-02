import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export default async function PrivatePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Private Dashboard</h1>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <button
              type="submit"
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Sign Out
            </button>
          </form>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Welcome back!</h2>
          <p className="text-gray-600">
            Signed in as: <span className="font-medium">{session.user.email}</span>
          </p>

          <div className="mt-8">
            <h3 className="mb-2 text-lg font-semibold">Your Private Tools</h3>
            <p className="text-gray-600">
              Add your private functionality here - API testing, admin tools, personal utilities, etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
