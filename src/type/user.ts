import { type LoaderRiwayat_Penukaran } from "./riwayatPenukaran.type";
import { type TTransaksi } from "./transaksi.type";

export type UserProfile = {
  id: number;
  nama: string | null;
  alamat: string;
  no_hp: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
export type PropsProfile = {
  user: UserProfile;
  point: {
    totalTransaksi: number;
    totalPenukaran: number;
    totalPenyerahan: number;
    totalMaterial: number;
  };
};

export type User_Relational = {
  id: number;
  nama: string | null;
  alamat: string;
  no_hp: string;
  email: string;

  Transaksi: TTransaksi[];
  Riwayat: LoaderRiwayat_Penukaran[];
};
