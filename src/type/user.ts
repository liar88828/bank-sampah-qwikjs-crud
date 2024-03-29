import { Transaksi } from "./transaksi";
import { Riwayat_Penukaran } from "./Riwayat_Penukaran";

export type User = {
  id: number;
  nama: string | null;
  alamat: string;
  no_hp: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User_Relasional = {
  id: number;
  nama: string | null;
  alamat: string;
  no_hp: string;
  email: string;

  Transaksi: Transaksi[];
  Riwayat: Riwayat_Penukaran[];
};
