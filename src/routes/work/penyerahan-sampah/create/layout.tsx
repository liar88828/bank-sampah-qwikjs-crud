import { QRL, Slot, component$ } from "@builder.io/qwik";
import {
  routeAction$,
  routeLoader$,
  useContent,
  useDocumentHead,
  useLocation,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { transaksi } from "~/db/transaksi";
import { user } from "~/db/users";
import { works } from "~/db/work";
import { zodPenyerahanSampah } from "~/lib/Zod";
import { useGetSession } from "../layout";
import { SessionExample } from "~/type/global.type";

export default component$(() => {
  const head = useDocumentHead();
  return <Slot />;
});

export const useLoadData = routeLoader$(
  async ({ query, resolveValue, cookie }) => {
    const getSession = cookie.get("id_user")?.json();
    if (!getSession) {
      const sessions = await resolveValue(useGetSession);
      cookie.set("id_user", sessions as SessionExample);
    }

    return {
      user: await user.findAll(),
      queryData: {
        // id_user: query.get("id_user"),
        // id_material: query.get("id_material"),
        status: query.get("status"),
        nama_sampah: query.get("sampah.0.nama"),
        jenis_sampah: query.get("sampah.0.jenis"),
        berat_sampah: query.get("sampah.0.berat"),
      },
    };
  },
);

export const useCreatePenyerahan = routeAction$(
  async (data, { redirect, fail, cookie }) => {
    const session = cookie.get("id_user")?.json() as SessionExample;
    console.log(session);
    if (!session) {
      return fail(401, {
        message: "Please login first",
      });
    }
    // let totalBerat = data.sampah.reduce((a, b) => Nu(a.berat) + b.berat, 0);

    const res = await works.penyerahanSampah({
      ...data,
      id_user: session.id, // "1"
    });
    console.log(res);

    if (!res.success) {
      return fail(500, {
        message: "User could not be added",
      });
    }

    if (res) {
      throw redirect(302, "/work/penyerahan-sampah");
    }
    return { form: data };
  },
  zodPenyerahanSampah,
);

export const defaultValue = {
  id: 0,
  berat: 0,
  jenis: "",
  nama: "",
  status: "",
};
