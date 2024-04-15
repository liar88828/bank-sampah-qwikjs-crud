import { Session } from "@auth/core/types";
import { Slot, component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { user } from "~/db/users";
import { works } from "~/db/work";
import { zodPenyerahanSampah } from "~/lib/Zod";
import { TPenyerahanSampah } from "~/type/penyerahanSampah.type";

export default component$(() => {
  return <Slot />;
});

export const useLoadData = routeLoader$(async ({ query, sharedMap }) => {
  const session = sharedMap.get("session") as Session;

  return {
    user: await user.findAll(),
    queryData: {
      status: query.get("status"),
      nama_sampah: query.get("sampah.0.nama"),
      jenis_sampah: query.get("sampah.0.jenis"),
      berat_sampah: query.get("sampah.0.berat"),
    },
  };
});

export const useCreatePenyerahan = routeAction$(
  async (data, { redirect, fail, sharedMap }) => {
    const session = sharedMap.get("session") as Session;

    if (!session) {
      return fail(401, {
        message: "Please login first",
      });
    }

    const newData: TPenyerahanSampah = {
      ...data,
      id_user: Number(session.user.id),
      status: "SIMPAN",
    };

    const res = await works.penyerahanSampah(newData);

    console.log(res);
    if (!res.success) {
      return fail(500, {
        message: "User could not be added",
      });
    }

    if (res) {
      throw redirect(302, "/user/penyerahan");
    }
    return { form: data };
  },
  zodPenyerahanSampah,
);
