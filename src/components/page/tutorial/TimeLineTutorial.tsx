import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { LuCheckCircle2 } from "@qwikest/icons/lucide"
import { CardTutor } from "~/components/card/Option"
import { type LoadTutorialOption } from "~/type/pages/tutorial.type"

export const TimeLineTutorial = component$(
  ({ data }: { data: LoadTutorialOption }) => {
    const { no, text } = data

    return (
      <CardTutor>
        <div>
          <div class="flex justify-center overflow-x-auto ">
            <ul class="timeline timeline-vertical timeline-compact md:timeline-horizontal">
              {data.array.map((d, i) => {
                const isCurrent = i <= no
                const isLast = i < no
                const lastLi = i === data.array.length - 1
                const firstLi = i !== 0
                const isPrimary = (i + 1) % 2 === 0

                return (
                  <li key={d.title + i}>
                    {firstLi && <hr class={`${isCurrent && "bg-success"}`} />}
                    <div
                      class={`${isPrimary ? " timeline-end " : " timeline-start "} timeline-box  ${isCurrent && "text-success"}  `}
                    >
                      <Link href={d.link.current}>{d.title}</Link>
                    </div>
                    <div class="timeline-middle">
                      <LuCheckCircle2
                        class={`h-5 w-5 ${isCurrent && "text-success"}  `}
                      />
                    </div>
                    {!lastLi && <hr class={isLast && "bg-success"} />}
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h1 class="font-bold">Catatan : </h1>
            <p class="text-sm">{text}</p>
            <ul class="list-decimal">
              {data.list?.map((d) => (
                <li key={d} class="ml-5 text-xs">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardTutor>
    )
  },
)
