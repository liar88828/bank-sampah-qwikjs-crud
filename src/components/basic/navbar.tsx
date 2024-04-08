import { component$ } from "@builder.io/qwik";
import {
  LuAlignJustify,
  LuArrowLeftRight,
  LuArrowUpDown,
  LuBadgeDollarSign,
  LuBoxes,
  LuHistory,
  LuHome,
  LuPersonStanding,
  LuPieChart,
  LuStickyNote,
} from "@qwikest/icons/lucide";
import { Link } from "@builder.io/qwik-city";

const listMenu = [
  {
    href: "/menu/landing-page/",
    text: "Home",
    icon: <LuHome font-size={25} class="inline-block h-6 w-6 stroke-current" />,
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
    icon: <LuStickyNote font-size={25} class="inline-block h-6 w-6 stroke-current" />,
  },
];

const listTable = [
  {
    href: "/table/users",
    text: "Users",
    icon: (
      <LuPersonStanding
        font-size={25}
        class="inline-block h-6 w-6 stroke-current"
      />
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
        class="inline-block h-6 w-6 stroke-current"
      />
    ),
  },

  {
    href: "/table/opsi-penukaran",
    text: "Opsi Penukaran",
    icon: (
      <LuArrowLeftRight
        font-size={25}
        class="inline-block h-6 w-6 stroke-current"
      />
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

const listWork = [
  // {
  //   href: "/work/beli-barang",
  //   text: "Jual Barang",
  //   icon: (
  //     <LuArrowUpDown
  //       font-size={25}
  //       class="inline-block h-6 w-6 stroke-current"
  //     />
  //   ),
  // },
  // {
  //   href: "/work/jual-barang",
  //   text: "Jual Barang",
  //   icon: (
  //     <LuArrowUpDown
  //       font-size={25}
  //       class="inline-block h-6 w-6 stroke-current"
  //     />
  //   ),
  // },

  {
    href: "/work/penyerahan-sampah",
    text: "Penyerahan Sampah",
    icon: (
      <LuArrowUpDown
        font-size={25}
        class="inline-block h-6 w-6 stroke-current"
      />
    ),
  },
];

export const Navbar = component$(() => {
  return (
    <>
      <div class="navbar bg-base-200">
        <div class="navbar-start">
          <SideBar />
        </div>
        <div class="navbar-center">
          <Link href={"/"} class="btn btn-ghost text-xl">
            daisyUI
          </Link>
        </div>
        <div class="navbar-end">
          <ListMenu />
        </div>
      </div>
    </>
  );
});

export const ListMenu = component$(() => {
  return (
    <>
      {/*List */}
      <ul class="menu menu-horizontal flex justify-end px-1">
        <li>
          <Link href={"/"}>Link</Link>
        </li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul class="rounded-t-none bg-base-100 p-2">
              <li>
                <Link href={"/"}>Link 1</Link>
              </li>
              <li>
                <Link href={"/"}>Link 2</Link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </>
  );
});

export const CartList = component$(() => {
  return (
    <>
      {/* Chart */}
      <div class="dropdown dropdown-end">
        <div tabIndex={0} role="button" class="btn btn-circle btn-ghost">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="badge indicator-item badge-sm">8</span>
          </div>
        </div>
        <div
          tabIndex={0}
          class="card dropdown-content card-compact z-[1] mt-3 w-52 bg-base-100 shadow"
        >
          <div class="card-body">
            <span class="text-lg font-bold">8 Items</span>
            <span class="text-info">Subtotal: $999</span>
            <div class="card-actions">
              <button class="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export const SideBar = component$(() => {
  return (
    <>
      <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          {/* Page content here */}
          <label
            for="my-drawer"
            class=" btn btn-square btn-ghost drawer-button
        "
          >
            <LuAlignJustify
              font-size={25}
              class="inline-block h-6 w-6 stroke-current"
            />
          </label>
        </div>
        <div class="drawer-side">
          <label
            for="my-drawer"
            aria-label="close sidebar"
            class="drawer-overlay"
          ></label>
          <ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
            <li class={"mb-10"}>Home</li>

            <div class="divider divider-success">Menu</div>
            {listMenu.map((d) => (
              <>
                <li key={d.text}>
                  <Link href={d.href}>
                    {d.icon} {d.text}
                  </Link>
                </li>
              </>
            ))}

            <div class="divider divider-success">Table</div>
            {listTable.map((d) => (
              <>
                <li key={d.text}>
                  <Link href={d.href}>
                    {d.icon} {d.text}
                  </Link>
                </li>
              </>
            ))}

            <div class="divider divider-accent">Work</div>
            {listWork.map((d) => (
              <>
                <li key={d.text}>
                  <Link href={d.href}>
                    {d.icon} {d.text}
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
});

export const Search = component$(() => {
  return (
    <>
      <button class="btn btn-circle btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </>
  );
});
