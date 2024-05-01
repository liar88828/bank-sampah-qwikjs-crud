import { Slot, component$ } from "@builder.io/qwik"
import { CardBody } from "./card-body"
import { CardHead } from "./card-head"
import { type PropsHeadCard } from "~/type/tag/PropsHeadCard"

export const CardLayout = component$(
  ({ title, href, class: classes }: PropsHeadCard) => {
    return (
      <CardBody class={classes}>
        <CardHead title={title} href={href} />
        <Slot />
      </CardBody>
    )
  },
)
