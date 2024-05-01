import type { Cases, Material, Opsi } from "@prisma/client"

export const materialKosong = {
  berat: 0,
  createdAt: new Date(),
  deskripsi: "dev_kosong",
  harga: 0,
  id: 0,
  jumlah: 0,
  id_user: "dev_kosong",
  nama: "dev_kosong",
  katergoryId: "dev_kosong",
  satuan: "dev_kosong",
  updatedAt: new Date(),
  kategori: "dev_kosong",
} as Material
export const OpsiKosong = {
  berat: 0,
  harga: 0,
  deskripsi: "dev_kosong",
  id: 0,
  typeOpsiId: "dev_kosong",
  id_transaksi: 0,
  updatedAt: new Date(),
  createdAt: new Date(),
} as Opsi
export const caseKosong = {
  berat: 0,
  id: 0,
  id_opsi: 0,
  id_material: 0,
  status: "dev_kosong",
  id_trolly: 0,
  // Material: materialKosong,
} as Cases
