// import { Transaksi } from "@prisma/client";

import { Signal } from "@builder.io/qwik";
import { TTransaksi } from "./transaksi.type";
import { Material, User } from "@prisma/client";

export type TMaterial = Pick<
  Material,
  | "berat"
  | "kategori"
  | "nama"
  | "id_user"
  | "deskripsi"
  | "harga"
  | "jumlah"
  | "satuan"
>;

export type Material_Relational = {
  berat: number;
  nama: string;
  id?: number;
  Transaksi: TTransaksi[];
};
export type PropsSelect = {
  jenis: string;
  _count: {
    jenis: number;
  };
  _sum: {
    berat: number | null;
  };
};
export type PropsMaterialUser = Material;
export type TSearchData = { nama: string; jenis: string };

export type DataMaterial = {
  id: number;
  nama: string;
  berat: number;
  kategori: string;
  id_user: number | null;
  createdAt: Date;
  User: User;
  Transaksi: {
    id: number;
    tgl_transaksi: Date;
    id_user: number | null;
  }[];
};
export type LoaderMaterialDetail =
  | Readonly<Signal<null>>
  | Readonly<Signal<DataMaterial>>;
