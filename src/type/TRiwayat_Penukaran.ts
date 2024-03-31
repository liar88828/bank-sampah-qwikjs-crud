export type TRiwayat_Penukaran = {
  id?: number;
  tgl_tukar: Date;
  id_user?: number;
  id_opsi_Penukaran?: number;
};
export type Opsi_Penukaran_Relasional = {
  id?: number;
  harga: number;
  deskripsi: string;
  Riwayat_Penukaran: TRiwayat_Penukaran[];
};
