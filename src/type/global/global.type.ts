import type { Session } from "@auth/core/types"

export type SessionExample = {
  id: number
  nama: string | null
  alamat: string
  no_hp: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export type Status = "SIMPAN" | "PROCESS" | "SELESAI"

export type Constructor<T> = new (...args: any[]) => T
export type UserId = Session["user"]["id"]

export type SetType<T> = Omit<T, "id" | "createdAt" | "updatedAt">
