import type { QRL } from "@builder.io/qwik"
import type {
  Material,
  Opsi,
  Transaksi,
  User,
  User_Option,
} from "@prisma/client"

export type TMaterial = Omit<Material, "createdAt" | "updatedAt">
export type CreateOpsi = Omit<
  Opsi,
  "id_transaksi" | "typeOpsiId" | "createdAt" | "updatedAt"
>
export type PropsTransaksi =
  | (Transaksi & {
      Opsi: Opsi | null
    })
  | null
export type TTransaksi = {
  id?: number
  tgl_transaksi: Date
  id_user: string
}
export type User_Status = User & User_Option
export type UserPrisma = Omit<
  User,
  "id" | "id_UserOption" | "updatedAt" | "createdAt"
> &
  Omit<User_Option, "id" | "active" | "role">
export type loaderOpsi_Penukaran = {
  id: number
  harga: number
  deskripsi: string
}
export type TableChildComponent = {
  href: string
  data: Material[]
  handlerAdd: QRL<(id: number, berat: number) => Promise<void>>
  loading: boolean
}
