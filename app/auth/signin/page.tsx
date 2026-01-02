import { signIn } from "@/auth"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Sign In</h2>
          <p className="mt-2 text-gray-600">
            Sign in to access your private dashboard
          </p>
        </div>
        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/private" })
          }}
        >
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  )
}
