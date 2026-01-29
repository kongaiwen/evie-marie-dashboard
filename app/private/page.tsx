import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import styles from './page.module.scss'

export default async function PrivatePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Private Dashboard</h1>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <button
              type="submit"
              className={styles.signOutButton}
            >
              Sign Out
            </button>
          </form>
        </div>

        <div className={styles.content}>
          <h2 className={styles.contentTitle}>Welcome back!</h2>
          <p className={styles.email}>
            Signed in as: <span className={styles.emailLabel}>{session.user.email}</span>
          </p>

          <div className={styles.tools}>
            <h3 className={styles.toolsTitle}>Your Private Tools</h3>
            <p className={styles.toolsDescription}>
              Add your private functionality here - API testing, admin tools, personal utilities, etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
