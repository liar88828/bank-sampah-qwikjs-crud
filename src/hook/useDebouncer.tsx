import { $, type QRL, useSignal } from "@builder.io/qwik"

export const useDebounce = (fn: QRL<(args: any) => void>, delay: number) => {
  const timeoutId = useSignal<number>()

  return $((args: any) => {
    clearTimeout(timeoutId.value)
    timeoutId.value = Number(setTimeout(() => fn(args), delay))
  })
}
