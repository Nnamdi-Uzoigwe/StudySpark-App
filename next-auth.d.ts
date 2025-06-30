import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      // Add any other custom properties you need
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    // Add any other custom JWT properties you need
  }
}