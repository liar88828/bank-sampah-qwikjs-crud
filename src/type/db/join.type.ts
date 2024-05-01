import type {
  Cases,
  Material,
  Opsi,
  Transaksi,
  User,
  User_Option,
} from "@prisma/client"
import type { TMaterial } from "./table.type"

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
  status: string
  sampah: Omit<TMaterial, "id">[]
}
export type UserFindMaterialReturn = Omit<
  TransaksiUser,
  "opsi_Penyerahan" | "userBuy"
>[]

export type UserActiveDashboard = (User & {
  User_Option: User_Option | null
})[]

export type MaterialGroup = {
  _sum: {
    berat: number | null
  }
  _count: {
    kategori: number
  }
}[]

export type MaterialTotal = {
  user: {
    id: string
    nama: string
    nama_belakang: string
    alamat: string
  }[]
  material: MaterialGroup
}
