import { component$ } from "@builder.io/qwik";
import { BarStatus } from "~/components/chart/bar/bar-status";
import { DonutStatus } from "~/components/chart/donut/donut-status";
import { LineStatus } from "~/components/chart/line/line-status";

export const Status = component$(() => {
  return (
    <>
      {/* <div class="flex gap-2 flex-col"> */}
      <div class="grid grid-cols-1 gap-5  sm:grid-cols-2 sm:gap-5 md:grid-cols-4 ">
        <>
          <div class=" flex  justify-between rounded bg-base-200 px-10 py-5  shadow shadow-gray-400 sm:px-5 ">
            <div class=" flex flex-col justify-between">
              <h1 class="whitespace-nowrap font-semibold">Week Sales</h1>
              <p class="text-2xl font-bold">$47k</p>
              <span class=" badge badge-primary">+3.5%</span>
            </div>
            <div class="h-20">
              <BarStatus />
            </div>
          </div>
        </>

        <>
          <div class="flex justify-between rounded bg-base-200 px-10 py-5 shadow shadow-gray-400 md:p-5">
            <div class="flex flex-col justify-between">
              <h1 class="whitespace-nowrap font-semibold">Total Order</h1>
              <p class="text-2xl font-bold">85.4k</p>
              <span class=" badge badge-info">+3.5%</span>
            </div>
            <div class="h-20">
              <LineStatus />
            </div>
          </div>
        </>

        <>
          <div class="flex justify-between rounded bg-base-200  px-10 py-5 shadow shadow-gray-400 md:p-5">
            <div class="">
              <h1 class="whitespace-nowrap font-semibold">Market Share</h1>
              <ul class="mt-1 space-y-1 text-xs">
                {[
                  { size: 20, name: "Samsung" },
                  { size: 30, name: "Huawei" },
                  { size: 70, name: "Apple" },
                ].map((d) => (
                  <li key={d.name}>
                    <p>
                      {d.name} {d.size}%
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div class="h-20">
              <DonutStatus />
            </div>
          </div>
        </>

        <>
          <div class="flex justify-between rounded bg-base-200 px-10 py-5 shadow shadow-gray-400 md:p-5">
            <div class="flex flex-col justify-between">
              <h1 class="whitespace-nowrap font-semibold">Total Order</h1>
              <p class="text-2xl font-bold">85.4k</p>
              <span class=" badge badge-info">+3.5%</span>
            </div>
            <div class="h-20">
              <LineStatus />
            </div>
          </div>
        </>
      </div>
    </>
  );
});
