import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    email: profile.email || "",
                    image: profile.avatar_url,
                    username: profile.login,
                };
            },
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
});