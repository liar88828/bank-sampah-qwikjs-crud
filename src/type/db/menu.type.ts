import type { User, Material, kategori } from "@prisma/client"

export type TSearchData = { nama: string; jenis: string }
export type MaterialGroupBy = {
  _count: {
    kategori: number
  }
  _sum: {
    berat: number | null
  }
}[]
export type MaterialLoader = {
  searchMaterial: Material[]
  selectMaterial: kategori[]
}
export type NasabahLoader = {
  searchNasabah: User[]
}
