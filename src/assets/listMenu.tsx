import {
  LuHome,
  LuPieChart,
  LuStickyNote,
  LuUser,
  LuWrapText,
} from "@qwikest/icons/lucide";

export const listMenu = [
  {
    href: "/menu/landing-page/",
    text: "Home",
    icon: <LuHome font-size={25} class="inline-block h-6 w-6 stroke-current" />,
  },
  {
    href: "/user/profile/",
    text: "Profile",
    icon: <LuUser font-size={25} class="inline-block h-6 w-6 stroke-current" />,
  },
  {
    href: "/menu/dashboard",
    text: "Dashboard",
    icon: (
      <LuPieChart font-size={25} class="inline-block h-6 w-6 stroke-current" />
    ),
  },
  {
    href: "/menu/page/",
    text: "Page",
    icon: (
      <LuStickyNote
        font-size={25}
        class="inline-block h-6 w-6 stroke-current"
      />
    ),
  },
  {
    href: "/menu/status/",
    text: "Status",
    icon: (
      <LuWrapText font-size={25} class="inline-block h-6 w-6 stroke-current" />
    ),
  },
  {
    href: "/work/transaksi/",
    text: "Transaksi",
    icon: (
      <LuWrapText font-size={25} class="inline-block h-6 w-6 stroke-current" />
    ),
  },
];
