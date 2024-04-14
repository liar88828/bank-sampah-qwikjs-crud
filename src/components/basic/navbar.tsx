import { $, component$ } from "@builder.io/qwik";
import { LuAlignJustify } from "@qwikest/icons/lucide";
import { Link } from "@builder.io/qwik-city";
import {
  useAuthSession,
  useAuthSignin,
  useAuthSignout,
} from "~/routes/plugin@auth";
import { listMenu } from "~/assets/listMenu";
import { listTable } from "~/assets/listTable";
import { listWork } from "~/assets/listWork";


export const Navbar = component$(() => {
  return (
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
  );
});

export const ListMenu = component$(() => {
  const signIn = useAuthSignin();
  const session = useAuthSession();
  const signOut = useAuthSignout();

  const handlerSignOut = $(() => {
    signOut.submit({ callbackUrl: "/" });
  });
  const handlerSignIn = $(() => {
    signIn.submit({
      providerId: "github",
      options: { callbackUrl: "http://localhost:5173/" },
    });
  });
  return (
    <>
      {/*List */}
      <ul class="menu menu-horizontal flex justify-end px-1">
        <li>
          <Link href={"/"}>Link</Link>
        </li>
        <li>
          <details>
            <summary>Auth</summary>
            <ul class="rounded-t-none bg-base-100 p-2">
              <li class="">
                {session.value?.user === undefined && (
                  <button
                    class="whitespace-nowrap"
                    onClick$={() => handlerSignIn()}
                  >
                    Sign In
                  </button>
                )}
              </li>
              <li>
                {session.value?.user !== undefined && (
                  <button
                    class="whitespace-nowrap"
                    onClick$={() => handlerSignOut()}
                  >
                    Sign Out
                  </button>
                )}
              </li>
            </ul>
          </details>
        </li>
      </ul>
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
