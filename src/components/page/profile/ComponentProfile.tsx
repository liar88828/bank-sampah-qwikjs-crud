import { component$ } from "@builder.io/qwik"
import { UserBio } from "~/components/page/profile/UserBio"
import { UserInformation } from "~/components/page/profile/UserInformation"
import { TotalLinkProfile } from "~/components/page/profile/TotalLinkProfile"
import { type PropsProfileLoader } from "~/type/pages/user.type"

export const ProfileIndex = component$(
  ({ data }: { data: PropsProfileLoader }) => {
    return (
      <div class="card card-compact static bg-base-100">
        <div class="card-body grid grid-cols-1 divide-y-2 divide-info rounded-2xl sm:grid-cols-3 sm:divide-none ">
          <div class="col-span-1 ">
            <UserBio data={data.user} />
          </div>

          <div class="col-span-2 divide-y-2 divide-info ">
            <UserInformation data={data.user} />
            <TotalLinkProfile point={data.point} />
          </div>
        </div>
      </div>
    )
  },
)
