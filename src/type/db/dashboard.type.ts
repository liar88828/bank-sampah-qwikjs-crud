import type { Material, User, User_Option } from "@prisma/client"

export type MaterialTransaction = {
  berat: number
  harga: number
  sumBerat: number
  sumHarga: number
  count: number
  id: number
  id_transaksi: number
}
export type UserTransaction = {
  id: string
  nama: string
  nama_belakang: string | null
  alamat: string
}
export type CombineTransaction = {
  users: UserTransaction | undefined
  materials: MaterialTransaction | undefined
  userBuyId: string
  count_id: number
  id: number
}

export type UserActiveDashboard = Pick<
  User,
  "nama" | "nama_belakang" | "alamat"
> & {
  User_Option: Pick<User_Option, "role" | "active"> | null
}
export type MaterialPick = Pick<
  Material,
  "nama" | "kategori" | "id_user" | "berat"
>
export type UserPick = Pick<User, "id" | "nama" | "nama_belakang" | "alamat">
export type TotalMaterialProps = {
  material: MaterialPick[]
  users: UserPick[]
  combinedData: (MaterialPick & {
    user: UserPick | undefined
  })[]
}
export interface TotalOrder {
  day: string
  count: number
}
export type TotalTransaksi = {
  _sum: {
    harga: number | null
    berat: number | null
  }
}
export type TransactionFind = {
  userBuyId: string
  count_id: number
  id: number
}
export type BestTransactionProps = {
  transaction: TransactionFind[]
  material: MaterialTransaction[]
  user: UserTransaction[]
  combinedData: CombineTransaction[]
}
