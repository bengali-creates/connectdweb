import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import connectDb from "@/utils/connectDb"
import User from "@/models/User"

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      if (account.provider === 'github') {
        await connectDb();
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // Create a new user if it doesn't exist
          const newUser = await User.create({
            name: user.name,
            username: profile.login,
            email: user.email,
            profilepic: user.image,

          });
          await newUser.save();

        }

      }
      return true;
    }
  },
})

export { handler as GET, handler as POST }