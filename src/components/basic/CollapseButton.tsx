import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"

export const CollapseButton = component$(
  ({
    title,
    href,
    textButton,
  }: {
    title: string
    href: string
    textButton: string
  }) => {
    return (
      <div class="collapse static bg-base-200">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div class="collapse-title  static text-xl font-medium">{title}</div>
        <div class="collapse-content static">
          <p>
            <Link href={href} class="btn btn-info btn-sm">
              {textButton}
            </Link>
          </p>
        </div>
      </div>
    )
  },
)
