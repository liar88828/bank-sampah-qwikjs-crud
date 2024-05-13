import type { Cases, Material, Opsi, Transaksi, User } from "@prisma/client"
import type { SetType } from "../global/global.type"

export type DataMaterial = {
  id: number
  nama: string
  berat: number
  kategori: string
  id_user: string | null
  createdAt: Date
  User: {
    nama: string
    userBuy: {
      id: number
      tgl_transaksi: Date
    }[]
  } | null
} | null

export type CaseTransaksi = Cases & {
  Material: Material | null
}

export type OpsiCase = Opsi & {
  Cases: CaseTransaksi[]
}
export type TransaksiUser = Transaksi & {
  userBuy: User | null
  Opsi: OpsiCase | null
}
export type TPenyerahanSampah = {
  id_user: string
  transaksi: SetType<Transaksi>
  material: SetType<Material>[]
}
export type UserFindMaterialReturn = Omit<
  TransaksiUser,
  "opsi_Penyerahan" | "userBuy"
>[]

export type MaterialGroup = {
  _sum: {
    berat: number | null
  }
  _count: {
    kategori: number
  }
}[]

export type BestSellingProps = {
  user: Pick<User, "alamat" | "nama_belakang" | "nama" | "id">[]
  material: MaterialGroup
}
