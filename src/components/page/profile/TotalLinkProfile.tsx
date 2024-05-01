import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { type JSX } from "@builder.io/qwik/jsx-runtime"
import {
  LuArrowLeftRight,
  LuBadgeDollarSign,
  LuBox,
} from "@qwikest/icons/lucide"
import { TitleComponent } from "~/components/basic/TitleComponent"
import { type PropsProfileLoader } from "~/type/pages/user.type"

export const TotalLinkProfile = component$(
  ({ point }: { point: PropsProfileLoader["point"] }) => {
    const listPoint = [
      {
        title: "Transaksi",
        href: "/table/transaksi?page=0",
        point: point.totalTransaksi,
        icon: <LuArrowLeftRight />,
      },
      {
        title: "Penyerahan",
        href: "/table/penyerahan?page=0",
        point: point.totalPenyerahan,
        icon: <LuBadgeDollarSign />,
      },
      {
        title: "Trolly",
        href: "/table/trolly?page=0",
        point: point.totalTrolly || 0,
        icon: <LuBox />,
      },
      {
        title: "Penukaran",
        href: "/table/penukaran?page=0",
        point: point.totalPenukaran,
        icon: <LuBadgeDollarSign />,
      },
      {
        title: "Material",
        href: "/table/material?page=0",
        point: point.totalMaterial || 0,
        icon: <LuBox />,
      },
    ]

    return (
      <TitleComponent title="Total Information">
        <div class="mt-1  flex w-full flex-wrap gap-2  sm:col-span-2 sm:mt-0">
          {listPoint.map((item) => (
            <PointLink
              key={item.title}
              title={item.title}
              href={item.href}
              point={item.point}
              icon={item.icon}
            />
          ))}
        </div>
      </TitleComponent>
    )
  },
)

export const PointLink = component$(
  ({
    title,
    href,
    point,
    icon,
  }: {
    title: string
    href: string
    point: number
    icon: JSX.Element
  }) => {
    return (
      <Link href={href} class="btn btn-info btn-xs sm:btn-sm">
        {title}
        {icon}
        {point}
      </Link>
    )
  },
)
