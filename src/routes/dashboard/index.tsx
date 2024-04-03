import { component$ } from "@builder.io/qwik";
import { Bars } from "./components/Bars";
import { Lines } from "./components/Lines";
import { Donut } from "./components/Donut";

export default component$(() => {
  return (
    <>
      <Status />
    </>
  );
});

export const Status = component$(() => {
  return (
    <div class="grid gap-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-full md:w-fit">
      <>
        <div class="flex  rounded bg-base-200 justify-between py-5 px-10 md:p-5 ">
          <div class=" flex flex-col justify-between">
            <h1 class='font-semibold whitespace-nowrap'>Week Sales</h1>
            <p class="text-2xl font-bold">$47k</p>
            <span class=" badge badge-primary">+3.5%</span>
          </div>
          <div class="">
            <Bars />
          </div>
        </div>
      </>
      <>
        <div class="flex rounded bg-base-200 justify-between py-5 px-10 md:p-5">
          <div class="flex flex-col justify-between">
            <h1 class='font-semibold whitespace-nowrap'>Total Order</h1>
            <p class="text-2xl font-bold">85.4k</p>
            <span class=" badge badge-info">+3.5%</span>
          </div>
          <div class="">
            <Lines />
          </div>
        </div>
      </>
      <>
        <div class="flex rounded bg-base-200 justify-between  py-5 px-10 md:p-5 ">
          <div class="">
            <h1 class='font-semibold whitespace-nowrap'>Market Share</h1>
            <ul class="text-xs mt-1 space-y-1">
              {[
                { size: 20, name: "Samsung" },
                { size: 30, name: "Huawei" },
                { size: 70, name: "Apple" },
              ].map((d) => (
                <li key={d.name}>
                  <p>{d.name} {d.size}%</p>
                </li>
              ))}
            </ul>
          </div>
          <div class="">
            <Donut />
          </div>
        </div>
      </>

      <>
        <div class="flex rounded bg-base-200 justify-between py-5 px-10 md:p-5">
          <div class="flex flex-col justify-between">
            <h1 class='font-semibold whitespace-nowrap'>Total Order</h1>
            <p class="text-2xl font-bold">85.4k</p>
            <span class=" badge badge-info">+3.5%</span>
          </div>
          <div class="">
            <Lines />
          </div>
        </div>
      </>
    </div>
  );
});
