import { component$ } from "@builder.io/qwik";
import { NasabahActive } from "./component/NasabahActive";
import { MaterialSampah } from "./component/MaterialSampah";
import { TSearchData, material } from "~/db/material";
import { routeLoader$ } from "@builder.io/qwik-city";
import { user } from "~/db/users";


export const useLoadMaterial = routeLoader$(({ query }) => {
  const search: TSearchData = {
    jenis: query.get('jenis') || '',
    nama: query.get('nama') || ''
  }
  return material.findGroup(search);
});

// export const useLoadUser = routeLoader$(({ query }) => {
//   const nama = query.get('user') || ''
//   return user.findSearch(nama);
// })


export default component$(() => {
  return (
    <section class=" container rounded bg-base-300 p-5">
      <div class="space-y-5">
        <NasabahActive />

        <MaterialSampah />
        {/* <div class="mt-5 grid  grid-cols-1 gap-5 sm:grid-cols-2">
        
        <MaterialWarehouse />
    </div> */}
      </div>
    </section>
  );
});
