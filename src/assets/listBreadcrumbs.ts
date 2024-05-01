import { type ListBreadcrumbs } from "~/type/tag/Breadcrumb.type"

const subTable = [
  {
    name: "Create",
    link: "/create",
    sub: [],
  },
  {
    name: "Edit",
    link: "/edit",
    sub: [],
  },
  {
    name: "Detail",
    link: "/detail",
    sub: [],
  },
]
export const listBreadcrumbs: ListBreadcrumbs = [
  // --------Menu
  {
    name: "Menu",
    link: "/menu",
    sub: [
      {
        name: "Dashboard",
        link: "/dashboard",
        sub: [],
      },
      {
        name: "Status",
        link: "/status",
        sub: [],
      },
      {
        name: "Page",
        link: "/page",
        sub: [
          {
            name: "User-Material",
            link: "",
            sub: [],
          },
        ],
      },

      {
        name: "Landing Page",
        link: "/landing-page",
        sub: [],
      },
    ],
  },

  // -----Table
  {
    name: "Table",
    link: "/table",
    sub: [
      {
        name: "Material",
        link: "/material",
        sub: subTable,
      },

      {
        name: "Transaksi",
        link: "/transaksi",
        sub: [],
      },
      {
        name: "Penukaran",
        link: "/penukaran",
        sub: subTable,
      },
      {
        name: "Penyerahan",
        link: "/penyerahan",
        sub: subTable,
      },
      {
        name: "Users",
        link: "/users",
        sub: subTable,
      },
      {
        name: "Trolly",
        link: "/trolly",
        sub: subTable,
      },
    ],
  },
  // -----User
  {
    name: "User",
    link: "/user",
    sub: [
      {
        name: "Profile",
        link: "/profile",
        sub: [],
      },

      {
        name: "Edit",
        link: "/edit",
        sub: [],
      },
      {
        name: "Print",
        link: "/print",
        sub: [],
      },

      {
        name: "Info",
        link: "/info",
        sub: [],
      },
      {
        name: "Dashboard",
        link: "/dashboard",
        sub: [],
      },
      {
        name: "Transaksi",
        link: "/transaksi",
        sub: [],
      },

      {
        name: "Trolly",
        link: "/trolly",
        sub: [],
      },
    ],
  },

  // --- Work
  {
    name: "Work",
    link: "/work",
    sub: [
      {
        name: "Keluar Sampah",
        link: "/keluar-sampah",
        sub: [],
      },
      {
        name: "Masuk Sampah",
        link: "/masuk-sampah",
        sub: [],
      },
      {
        name: "Pendaftaran-anggota",
        link: "/pendaftaran-anggota",
        sub: [],
      },
      {
        name: "Penyerahan-sampah",
        link: "/penyerahan-sampah",
        sub: [],
      },
      { name: "Stor-barang", link: "/stor-barang", sub: [] },
      { name: "Laporan", link: "/laporan", sub: [] },
    ],
  },
  {
    name: "Tutorial",
    link: "/tutorial",
    sub: [
      {
        name: "Tutorial",
        link: "/",
        sub: [],
      },
    ],
  },
]
