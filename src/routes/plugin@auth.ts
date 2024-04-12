import { serverAuth$ } from "@builder.io/qwik-auth";
import GitHub from "@auth/core/providers/github";
import type { Provider } from "@auth/core/providers";
import { prisma } from "~/config/prisma";

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    // session: {
    //   strategy: "jwt",
    // },
    callbacks: {
      signIn: async ({ user, account, profile }) => {
        // console.log({ user, account, profile });
        // find user
        const res = await prisma.user.findUnique({
          where: {
            // id: Number(profile?.id as number),
            email: profile?.email as string,
          },
        });
        // console.log(res, "res");
        // // if user not exist will create

        const location = profile?.location as string;
        const phone = profile?.phone_number as string;
        const data = {
          email: profile?.email || "",
          alamat: location || "",
          nama: profile?.name || "",
          id: Number(profile?.id),
          no_hp: phone || "",
        };
        if (!res) {
          await prisma.user.create({
            data: data,
          });
        }

        return true;
      },
      jwt: async ({ token, account, user, profile, session }) => {
        console.log({ token, user, account, session, profile });
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
        return token;
      },
      session: async ({ session, token, user, trigger, newSession }) => {
        // console.log({  token,  });
        //@ts-ignore
        session.loggedUser = token.loggedUser;
        session.user.id = token.sub as string;
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
        return session;
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
      GitHub({
        clientId: env.get("GITHUB_ID")!,
        clientSecret: env.get("GITHUB_SECRET")!,
      }),
    ] as Provider[],
  }));
