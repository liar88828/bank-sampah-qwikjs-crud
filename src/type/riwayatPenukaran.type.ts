export type LoaderRiwayat_Penukaran = {
  id: number;
  tgl_tukar: Date;
  id_user_penukaran: number | null;
  id_opsi_penukaran: number | null;
};
export type Opsi_Penukaran_Relational = {
  id?: number;
  harga: number;
  deskripsi: string;
  Riwayat_Penukaran: LoaderRiwayat_Penukaran[];
};

export type LoaderRiwayatPenukaran_Select = {
  user: {
    id: number;
    nama: string | null;
  }[];
  opsiPenukaran: {
    id: number;
    deskripsi: string;
  }[];
};


export type ActionRiwayatPenukaran = {
  id: number;
  tgl_tukar: Date;
  id_user_penukaran: number | null;
  id_opsi_penukaran: number | null;
};