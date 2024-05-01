import { component$ } from "@builder.io/qwik"
import {
  getStatusObject,
  TimeLine,
  type PropsStatus,
} from "~/components/timeline/TimeLine"

export const StatusLine = component$(({ status }: { status: PropsStatus }) => {
  return (
    <div class=" card card-compact static bg-base-100">
      <div class="card-body">
        <h1 class="card-title">Process Transaksi</h1>
        <div class="flex justify-center">
          <TimeLine status={getStatusObject(status)} />
        </div>
      </div>
    </div>
  )
})
