import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Restrict to only your Gmail account
      const allowedEmail = process.env.ALLOWED_EMAIL
      if (user.email === allowedEmail) {
        return true
      }
      return false
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
})
