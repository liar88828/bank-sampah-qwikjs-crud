import { type Session } from "@auth/core/types"
import { component$, Slot, $, useOnWindow, useSignal } from "@builder.io/qwik"
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city"
import { BottomNavigation } from "~/components/basic/bottom/bottom-navigation"
import { Navbar } from "~/components/basic/head/navbar/navbar"
import { prisma } from "~/config/prisma"
import { db } from "~/db/db"

export const onRequest: RequestHandler = async ({
  redirect,
  sharedMap,

  cookie,
}) => {
  const session: Session = sharedMap.get("session")
  if (!session || new Date(session.expires) < new Date()) {
    throw redirect(
      302,
      `/api/auth/signin?callbackUrl=${
        // url.pathname
        "/"
      }`,
    )
  }

  if (!cookie.has("userProfile")) {
    const res = await prisma.user.findUnique({
      where: { id: session.user.id },
    })
    //@ts-ignore
    if (res?.nama?.length < 1) {
      throw redirect(302, `/`)
    } else {
      cookie.set("userProfile", JSON.stringify(res))
    }
  }
}

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  })
}

export const useLoadNotification = routeLoader$(async ({ sharedMap }) => {
  const session: Session = sharedMap.get("session")
  const id = session.user.id

  const trollyUnProcess = await db.profile.totalTrolly(id)
  const transactionUnProcess = await db.profile.totalUnprocessedTransaction(id)

  return {
    trolly: trollyUnProcess,
    transaction: transactionUnProcess,
  }
})

export default component$(() => {
  const size = useSignal<number>(641)
  useOnWindow(
    "resize",
    $((event) => {
      //@ts-ignore
      const mouseEvent = event.currentTarget.innerWidth as number
      // console.log(event.target)
      size.value = mouseEvent
    }),
  )
  console.log(size.value <= 640)
  return (
    <>
      <Navbar />
      <div class=" min-h-screen bg-base-300  py-1  pb-8 sm:py-5 ">
        <Slot />
      </div>
      {size.value <= 640 && <BottomNavigation />}
    </>
  )
})
