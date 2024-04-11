import { QRL } from "@builder.io/qwik";

export type SessionExample = {
  id: number;
  nama: string | null;
  alamat: string;
  no_hp: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};


export type Search = {
  search?: string;
  valueSearch: string;
  goSearch: QRL<(this: Search) => void>;
};
export type Pagination = {
  pages: number;
  increment: QRL<(this: Pagination) => void>;
  decrement: QRL<(this: Pagination) => void>;
};
