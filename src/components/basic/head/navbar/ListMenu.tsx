import { $, Resource, component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import {
  useAuthSession,
  useAuthSignin,
  useAuthSignout,
} from "~/routes/plugin@auth"
import {
  LuLogIn,
  LuSettings,
  LuShoppingCart,
  LuBookText,
  LuLogOut,
} from "@qwikest/icons/lucide"
import { useLoadNotification } from "~/routes/layout"
import { Spinner } from "../../../loading/spinner"

export const ListMenu = component$(() => {
  const signIn = useAuthSignin()
  const session = useAuthSession()
  const signOut = useAuthSignout()
  const dataLoad = useLoadNotification()

  const handlerSignOut = $(() => {
    signOut.submit({ callbackUrl: "/" })
  })

  const handlerSignIn = $(() => {
    signIn.submit({
      providerId: "github",
      options: { callbackUrl: "http://localhost:5173/" },
    })
  })

  const isLogin = session.value?.user

  // console.log(dataLoad)
  return (
    <Resource
      value={dataLoad}
      onPending={() => <Spinner />}
      onRejected={() => <span>Error</span>}
      onResolved={(notify) => (
        <ul class="menu menu-horizontal flex justify-center  space-x-0  pr-3">
          <li class="flex items-stretch">
            <details>
              <summary class="">
                {isLogin ? <LuSettings /> : <LuLogIn />}
              </summary>

              <ul class="z-[1] rounded-box bg-base-100 shadow">
                {isLogin === undefined && (
                  <li class="p-2">
                    <button
                      class="whitespace-nowrap"
                      onClick$={() => handlerSignIn()}
                    >
                      Sign In
                    </button>
                  </li>
                )}

                {isLogin !== undefined && (
                  <>
                    <li>
                      <Link href={"/"} class="p-2">
                        <LuShoppingCart />
                        <span class="badge badge-info">{notify.trolly}</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={"/"} class="p-2">
                        <LuBookText />
                        <span class="badge badge-info">
                          {notify.transaction}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <button
                        class="whitespace-nowrap p-2 text-xs hover:bg-error"
                        onClick$={() => handlerSignOut()}
                      >
                        <LuLogOut /> Out
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </details>
          </li>
        </ul>
      )}
    />
  )
})
