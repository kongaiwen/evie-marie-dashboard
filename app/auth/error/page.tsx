import Link from "next/link"
import styles from './page.module.scss'

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Authentication Error
          </h2>
          <p className={styles.message}>
            {searchParams.error === "AccessDenied"
              ? "You are not authorized to access this application."
              : "An error occurred during authentication."}
          </p>
          <Link
            href="/"
            className={styles.button}
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
