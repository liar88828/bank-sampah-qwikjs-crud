import GitHub from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"
import CredentialsProvider from "@auth/core/providers/credentials"
import { serverAuth$ } from "@builder.io/qwik-auth"
import { auth } from "~/controller/auth"
import type { Provider } from "@auth/core/providers"
import { bcrypt } from "~/lib/bcrypt/bcrypt"
import { prisma } from "~/config/prisma"

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    // session: {
    //   strategy: "jwt",
    // },
    callbacks: {
      signIn: async ({ profile, account }) => {
        console.log("signIn")
        console.log({ profile, account })

        if (account?.provider === "credentials") {
          return true
        }
        if (!profile || !account) {
          return false
        } else {
          const res = await auth.execute(profile, account)
          if (!res) {
            return false
          }
        }
        return true
      },
      jwt: async ({ token }) => {
        // console.log({ token, user, account, session, profile });
        // console.log("called jwt");
        // console.log(profile,'profile');
        // token.id=profile?.id
        // token.loggedUser = user;
        // console.log(account, "account");
        // if (account) {
        //   token.accessToken = account.access_token;
        // }
        // token = {...token,

        // }

        // if (profile) {
        //   const res = await prisma.user.findUnique({
        //     where: { id: profile?.id as number },
        //   });
        //   user.alamat
        // }
        return token
      },
      session: async ({ session, token }) => {
        // console.log({  token,  });
        //@ts-ignore
        session.loggedUser = token.loggedUser
        session.user.id = token.sub as string
        // console.log(newSession, "newSession");
        // console.log(user, "user");
        // console.log(token, "token");
        // console.log(session, "session");

        // session = {
        //   ...session,
        //   user: {
        //     id: token.id as string,
        //   },
        // };
        return session
      },
    },
    // events:{
    //   signIn: async ({ user,account,isNewUser, profile,}) => {
    //   console.log('user:', user)
    //   console.log('account : ',account)
    //   console.log('isNewUser : ',isNewUser)
    //   console.log('profile : ',profile)

    //   }
    // },
    providers: [
      CredentialsProvider({
        credentials: {
          email: {},
          password: {},
        },

        authorize: async (credentials) => {
          let user = null

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const pwHash = bcrypt.hash(credentials.password as string)

          // logic to verify if user exists
          user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
            // data: {
            //   email: credentials.email as string,
            //   // password: pwHash,
            //   alamat: "",
            //   nama: "",

            // },
          })

          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("User not found.")
          }

          // return user object with the their profile data
          return user
        },
      }),

      GitHub({
        clientId: env.get("GITHUB_ID")!,
        clientSecret: env.get("GITHUB_SECRET")!,
      }),
      Google({
        clientId: env.get("GOOGLE_ID")!,
        clientSecret: env.get("GOOGLE_SECRET")!,
        // authorization: {
        //   params: {
        //     prompt: "consent",
        //     access_type: "offline",
        //     response_type: "code",
        //   },
        // },
      }),
    ] as Provider[],
  }))
