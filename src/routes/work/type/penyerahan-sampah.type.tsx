import { QRL } from "@builder.io/qwik";

export type TotalMaterialProps = {
  id: number;
  nama: string;
  berat: number;
  jenis: string;
  id_sampahTransaksi: number | null;
}[];


export type TestData = keyof {
  id: number;
  total_berat: number;
  total_harga: number;
  Material: {
    id: number;
    nama: string;
    berat: number;
    jenis: string;
    id_sampahTransaksi: number | null;
  }[];
};


export type ProfileProps = {
  id: number;
  nama: string | null;
  alamat: string;
  no_hp: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TransaksiSampahProps = {
  id: number;
  total_berat: number;
  total_harga: number;
  Material: {
    id: number;
    nama: string;
    berat: number;
    jenis: string;
    id_sampahTransaksi: number | null;
  }[];
}[];

export type SampahStore = {
  list: {
    id: number;
    berat: number;
    jenis: string;
    nama: string;
  }[];
  add: QRL<(this: SampahStore) => void>;
  remove: QRL<(this: SampahStore, index: number) => void>;
};
