import { Session } from "@auth/core/types";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { works } from "~/db/work";
import { zodPenyerahanSampah } from "~/lib/Zod";
import { TPenyerahanSampah } from "~/type/penyerahanSampah.type";

export const useLoadData = routeLoader$(async ({ query, sharedMap }) => {
  return {
    status: query.get("status"),
    nama_sampah: query.get("sampah.0.nama"),
    jenis_sampah: query.get("sampah.0.jenis"),
    berat_sampah: query.get("sampah.0.berat"),
  };
});

export const useCreatePenyerahan = routeAction$(
  async (data, { redirect, fail, sharedMap }) => {
    const session = sharedMap.get("session") as Session;

    const newData: TPenyerahanSampah = {
      ...data,
      id_user: Number(session.user.id),
      status: "SIMPAN",
    };
    console.log("send data", newData);
    const res = await works.penyerahanSampah(newData);
    console.log('get data base',res)
    if (!res) {
      console.log("fail create data");
      return fail(500, {
        message: "User could not be added",
      });
    } else if (res) {
      console.log("success create data");
      throw redirect(302, "/user/penyerahan");
    } else {
      console.log("may be error");
      return { form: data };
    }
  },
  zodPenyerahanSampah,
);
