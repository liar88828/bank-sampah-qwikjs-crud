export type Loader_RiwayatTransaksi = {
  id: number
  id_user_penukaran: number | null
  id_opsi_penukaran: number | null
  Opsi_Penukaran: {
    id: number
    harga: number
    deskripsi: string
  } | null
  tgl_tukar: Date
  User: {
    id: number
    nama: string | null
    alamat: string
    no_hp: string
    email: string
    createdAt: Date
    updatedAt: Date
  } | null
}
