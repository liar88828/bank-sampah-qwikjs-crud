import { $, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import {
  useAuthSession,
  useAuthSignin,
  useAuthSignout,
} from "~/routes/plugin@auth";
import { SideBar } from "./SideBar";


export const Navbar = component$(() => {
  return (
    <div class="navbar bg-base-100">
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
        {/* <li>
          <Link href={"/"}>Link</Link>
        </li> */}
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

