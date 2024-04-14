import { TTransaksi } from "./transaksi.type";
import { TRiwayat_Penukaran } from "./riwayatPenukaran.type";

export type PropsProfile = {
  user: {
    id: number;
    nama: string | null;
    alamat: string;
    no_hp: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  } 
  point: {
    totalTransaksi: number;
    totalBeli: number;
    totalMaterial: number;
  };
};

export type User_Relasional = {
  id: number;
  nama: string | null;
  alamat: string;
  no_hp: string;
  email: string;

  Transaksi: TTransaksi[];
  Riwayat: TRiwayat_Penukaran[];
};
