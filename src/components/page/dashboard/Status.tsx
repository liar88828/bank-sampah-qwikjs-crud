import { Slot, component$ } from "@builder.io/qwik"
import { BarStatus } from "~/components/chart/bar/bar-status"
import { DonutStatus } from "~/components/chart/donut/donut-status"
import { LineStatus } from "~/components/chart/line/line-status"
import type { DashboardProps } from "~/db/join/dashboard"

export const Status = component$(
  ({ data }: { data: DashboardProps["status"] }) => {
    return (
      <>
        {/* <div class="flex gap-2 flex-col"> */}
        <div class="grid grid-cols-1 gap-5  sm:grid-cols-2 sm:gap-5 md:grid-cols-4 ">
          <StatusCard text="$47k" badge="+3.5%" title="Total Order">
            <BarStatus data={data.totalOrder} />
          </StatusCard>

          <StatusCard text="$47k" badge="+3.5%" title="Total Order">
            <LineStatus />
          </StatusCard>

          <div class="flex justify-between rounded bg-base-100  px-10 py-5 shadow   md:p-5">
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

          <StatusCard text="$47k" badge="+3.5%" title="Total Order">
            <LineStatus />
          </StatusCard>
        </div>
      </>
    )
  },
)

export const StatusCard = component$(
  ({
    title,
    text,
    badge,
  }: {
    badge: string
    text: string | { name: string; size: number }[]
    title: string
  }) => {
    return (
      <div class="flex justify-between rounded bg-base-100 px-10 py-5 shadow md:p-5">
        <div class="flex flex-col justify-between">
          <h1 class="whitespace-nowrap font-semibold md:text-xs ">{title}</h1>
          {typeof text === "string" && <p class="text-2xl font-bold">{text}</p>}
          {typeof text === "object" && (
            <ul class="mt-1 space-y-1 text-xs">
              {text.map((d) => (
                <li key={d.name}>
                  <p>
                    {d.name} {d.size}%
                  </p>
                </li>
              ))}
            </ul>
          )}

          <span class=" badge badge-info">{badge}</span>
        </div>
        <div class="h-20">
          <Slot />
        </div>
      </div>
    )
  },
)
