import {
  LuArrowLeftRight, LuBadgeDollarSign,
  LuBoxes,
  LuHistory,
  LuPersonStanding
} from "@qwikest/icons/lucide";

export const listTable = [
  {
    href: "/table/users",
    text: "Users",
    icon: (
      <LuPersonStanding
        font-size={25}
        class="inline-block h-6 w-6 stroke-current" />
    ),
  },
  {
    href: "/table/material",
    text: "Material",
    icon: (
      <LuBoxes font-size={25} class="inline-block h-6 w-6 stroke-current" />
    ),
  },
  {
    href: "/table/transaksi",
    text: "Transaksi",
    icon: (
      <LuBadgeDollarSign
        font-size={25}
        class="inline-block h-6 w-6 stroke-current" />
    ),
  },

  {
    href: "/table/opsi-penukaran",
    text: "Opsi Penukaran",
    icon: (
      <LuArrowLeftRight
        font-size={25}
        class="inline-block h-6 w-6 stroke-current" />
    ),
  },
  {
    href: "/table/riwayat-penukaran",
    text: "Riwayat Penukaran",
    icon: (
      <LuHistory font-size={25} class="inline-block h-6 w-6 stroke-current" />
    ),
  },
];
