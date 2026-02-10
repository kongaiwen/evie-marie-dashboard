'use client';

import { useState, useEffect } from 'react'
import { redirect } from "next/navigation"
import { useTranslations } from 'next-intl'
import { handleSignOut } from './actions'
import styles from './page.module.scss'

export default function PrivatePage() {
  const t = useTranslations('nav')

  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Client-side session check
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session')
        if (response.ok) {
          const data = await response.json()
          setSession(data)
        } else {
          redirect("/auth/signin")
        }
      } catch (error) {
        console.error('Session check failed:', error)
        redirect("/auth/signin")
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    redirect("/auth/signin")
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Private Dashboard</h1>
          <form action={handleSignOut}>
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
