import {TTransaksi} from "./TTransaksi";
import {TRiwayat_Penukaran} from "./TRiwayat_Penukaran";

export type TUser = {
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

  Transaksi: TTransaksi[];
  Riwayat: TRiwayat_Penukaran[];
};
