import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { Backend_URL } from "./lib/Constants";
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(Backend_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });
  
  const response = await res.json();
  // console.log( token.backendTokens.refreshToken);

  return {
    ...token,
    backendTokens: {
      accessToken: response.accessToken,
      refreshToken: token.backendTokens.refreshToken,
      expiresIn: response.expiresIn,
    }
  }
}


export const authOptions: NextAuthOptions = {
  // pages: {
  //   signIn: "/login",
  // },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credenciais",
      

      credentials: {
        
        username: {
          label: "Usuário",
          type: "text",
          placeholder: "Email",
        },
        password: { label: "Senha", type: "password" },
      

      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;

        const res = await fetch(Backend_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 401) {
          console.log(res.statusText);

          return null;
        }

        const user = await res.json();
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },

  callbacks: {
    async jwt({ token, user}) {
      if (user) return {...token, ...user}
      if (new Date().getTime() < token.backendTokens.expiresIn) return token;


      return await refreshToken(token);
    },

    async session({ token, session}) {
      if (token) {
      session.user = token.user
      session.backendTokens = token.backendTokens;
      }
      // console.log(session)
      return session;
    },

    // async redirect({ url, baseUrl }) {

    //   return "/"
    // },

  }
};