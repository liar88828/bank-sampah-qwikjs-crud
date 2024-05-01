import ImgBlankProfile from "~/media/images/blank-profile.webp?jsx"
import { component$ } from "@builder.io/qwik"
import { getDate } from "~/lib/utils/date"
import { type PropsProfileLoader } from "~/type/pages/user.type"
import { TextComponent } from "~/components/basic/TextComponent"
import { TitleComponent } from "~/components/basic/TitleComponent"

export const UserBio = component$(
  ({ data }: { data: PropsProfileLoader["user"] }) => {
    return (
      <div>
        <div class="avatar static mb-5 flex justify-center">
          <div class="w-32 rounded-full ring ring-info ring-offset-2 ring-offset-base-100 sm:w-40">
            <ImgBlankProfile />
          </div>
        </div>

        <div class="space-y-3 ">
          <TitleComponent title={`${data.nama} ${data.nama_belakang}`}>
            {/* <div class=" flex flex-wrap justify-between gap-3"> */}
            <TextComponent label="Join" text={getDate(data.createdAt)} />
            <TextComponent label="Sebagai" text={" Petugas"} />
            {/* </div> */}
          </TitleComponent>
        </div>
      </div>
    )
  },
)
{
  /* <TitleComponent title="Official Information">
<TextComponent label="Email" text={data.email} />
<TextComponent label="Phone" text={data.no_hp ?? "kosong"} />
<TextComponent label="Address" text={data.alamat} />
</TitleComponent> */
}

{
  /* <div class="card-actions items-center justify-center">
              <Link
                href="/table/users/update"
                class="btn btn-primary btn-xs sm:btn-sm md:btn-md"
              >
                Update
              </Link>
              <Link
                href="print"
                class="btn btn-primary btn-xs sm:btn-sm  md:btn-md"
              >
                Print
              </Link>
            </div> */
}
