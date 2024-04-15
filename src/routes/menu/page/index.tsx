import { component$ } from "@builder.io/qwik";
import { NasabahActive } from "./component/NasabahActive";
import { MaterialSampah } from "./component/MaterialSampah";

export default component$(() => {
  return (
    <section class=" container ">
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
