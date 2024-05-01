import { component$ } from "@builder.io/qwik"
import { TextComponent } from "~/components/basic/TextComponent"
import { TitleComponent } from "~/components/basic/TitleComponent"
import { getDate } from "~/lib/utils/date"
import { type PropsProfileLoader } from "~/type/pages/user.type"

export const UserInformation = component$(
  ({ data }: { data: PropsProfileLoader["user"] }) => {
    return (
      <>
        <TitleComponent title="Official Information">
          <TextComponent label="Email" text={data.email} />
          <TextComponent label="Phone" text={data.no_hp ?? "kosong"} />
          <TextComponent label="Address" text={data.alamat} />
        </TitleComponent>

        <TitleComponent title="Personal Information">
          <TextComponent label="Gender" text={data.kelamin ?? ""} />
          <TextComponent label="Tanggal Lahir" text={data.tempat_lahir ?? ""} />
          <TextComponent
            label="Tempat Lahir"
            text={getDate(data.tanggal_lahir)}
          />
        </TitleComponent>
      </>
    )
  },
)
