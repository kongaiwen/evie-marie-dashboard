import { signIn } from "@/auth"
import styles from './page.module.scss'

export default function SignInPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Sign In</h2>
          <p className={styles.subtitle}>
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
            className={styles.button}
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  )
}
