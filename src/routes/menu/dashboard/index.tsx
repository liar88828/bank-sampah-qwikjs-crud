import { component$ } from "@builder.io/qwik";
import { Status } from "./components/Status";
import { UserActive } from "./components/UserActive";
import { MaterialWarehouse } from "./components/MaterialWarehouse";
import { BestSelling } from "./components/BestSelling";
import { BarTopProduct } from "~/components/chart/bar/bar-topProduct";

export default component$(() => {
  return (
    <div class=" container ">
      <Status />

      <div class="mt-5 grid  grid-cols-1 gap-5 sm:grid-cols-2">
        <UserActive />
        <MaterialWarehouse />
      </div>

      <div class="mt-5 bg-base-100">
        <BestSelling />
      </div>

      <div class="mt-5 bg-base-100">
        <div class=" shadow-gray rounded p-5 shadow shadow-gray-400">
          <h1 class="text-xl font-bold ">Top Product</h1>
          {/* <div class="h-96"> */}
          <BarTopProduct />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
});
