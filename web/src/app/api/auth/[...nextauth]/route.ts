import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
            httpOptions: {
                timeout: 40000,
            },
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                const res = await fetch(
                    `${process.env.APP_NEXTAUTH_URL_INTERNAL}/auth/login`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${account?.id_token}`,
                        },
                    }
                );
                const resParsed = await res.json();
                token = Object.assign({}, token, {
                    id_token: account.id_token,
                });
                token = Object.assign({}, token, {
                    myToken: resParsed.authToken,
                });
            }

            return token;
        },
        async session({ session, token }) {
            if (session) {
                session = Object.assign({}, session, {
                    id_token: token.id_token,
                });
                session = Object.assign({}, session, {
                    authToken: token.myToken,
                });
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
        newUser: "/auth/new-user",
    },
});

export { handler as GET, handler as POST };

export const authOptions = handler;
