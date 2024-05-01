import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { CardTutor } from "~/components/card/Option"
import { type LoadTutorialOption } from "~/type/pages/tutorial.type"

export const FootStep = component$(({ data }: { data: LoadTutorialOption }) => {
  const { kembali, lanjut, link } = data
  return (
    <CardTutor class="card-compact">
      <div class="card-actions justify-around">
        {kembali ? (
          <Link href="/tutorial" class="btn btn-error btn-sm">
            Keluar
          </Link>
        ) : (
          <Link href={link.linkKembali} class="btn btn-primary btn-sm">
            Kembali
          </Link>
        )}

        {lanjut ? (
          <Link href="/tutorial" class="btn btn-primary btn-sm">
            Selesai
          </Link>
        ) : (
          <Link href={link.linkLanjut} class="btn btn-info btn-sm">
            Lanjut
          </Link>
        )}
      </div>
    </CardTutor>
  )
})
