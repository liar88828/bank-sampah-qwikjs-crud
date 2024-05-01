import type { Cases, Material, Transaksi, Trolly, User } from "@prisma/client"
import type { loadProps } from "~/db/cart/cart"

export type PropsCart = {
  data: loadProps | null
  totalBerat: number
  totalCart: number
  totalHarga: number
}
export type PropsFindOpsi = {
  Cases: PropsCase[]
  Transaksi: Transaksi
} | null

export type PropsProfile = {
  user: TUser
  point: {
    totalTransaksi: number
    totalPenukaran: number
    totalPenyerahan: number
    totalMaterial: number
    totalTrolly: number
  }
}
export type PropsCase = Cases & { Material: Material | null }

export type MaterialCartReturn = Material & {
  Cart_List: Cases[]
}

export type TUser = Omit<User, "updatedAt" | "createdAt">

export type CasesProps = Cases & { Material: Material | null }

export type PropsTrollyCard = Cases & {
  Trolly: Trolly | null
  Material: Material | null
}
