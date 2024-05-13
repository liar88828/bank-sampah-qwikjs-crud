import type { Account, Profile, Session } from "@auth/core/types"
import type {
  RequestEventLoader,
  RequestEventAction,
} from "@builder.io/qwik-city"
import { prisma } from "~/config/prisma"

export class AuthController {
  getSession(sharedMap: RequestEventAction["sharedMap"]) {
    return sharedMap.get("session") as Session
  }
  userId({ sharedMap }: RequestEventAction | RequestEventLoader) {
    return this.getSession(sharedMap).user.id
  }

  async sanitize(data: {
    email: string
    alamat: string
    nama: string
    id: string
    no_hp: string
  }) {
    console.log("test save database controller")
    return await prisma.user.create({
      data: {
        email: data.email ?? "",
        alamat: data.alamat ?? "",
        nama: data.nama ?? "",
        id: String(data?.id) ?? "",
        no_hp: data.no_hp ?? "",
      },
    })
  }

  async google(profile: Profile, account: Account) {
    console.log("test save google")
    if (account.provider === "google") {
      const verified =
        //@ts-ignore
        profile.email_verified && profile.email.endsWith("@gmail.com")
      if (verified) {
        console.log("test will save")
        const res = await this.sanitize({
          alamat: account?.locale as string,
          email: profile?.email as string,
          id: profile?.sub as string,
          nama: profile?.name as string,
          no_hp: profile?.phone_number as string,
        })
        if (res) {
          return true
        }
      }
    }
  }

  async github(profile: Profile, account: Account) {
    console.log("test save github")
    if (account.provider === "github") {
      const location = profile?.location as string
      const phone = profile?.phone_number as string
      const res = await this.sanitize({
        email: profile?.email as string,
        alamat: location as string,
        nama: profile?.name as string,
        id: profile?.id as string,
        no_hp: phone as string,
      })

      if (res) {
        return true
      }
    }
  }

  async execute(profile: Profile, account: Account) {
    console.log("test save execute auth")
    const res = await prisma.user.findUnique({
      where: {
        email: profile?.email as string,
        nama: profile?.name as string,
      },
    })
    console.log(res, "is exist?")
    if (!res) {
      if (account.provider === "github") {
        return await this.github(profile, account)
      }
      if (account.provider === "google") {
        return await this.google(profile, account)
      }
    }
    console.log("test success")
    return true
  }
}
export const auth = new AuthController()
