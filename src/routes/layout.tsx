import { Session } from "@auth/core/types";
import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { Navbar } from "~/components/basic/navbar";
import { prisma } from "~/config/prisma";


export const onRequest: RequestHandler = async ({ redirect, sharedMap, url, cookie }) => {
  // if (!isLoggedIn()) {
  //   throw redirect(308, '/login');
  // }
  const session: Session | null = sharedMap.get('session');
  if (!session || new Date(session.expires) < new Date()) {
    throw redirect(
      302,
      `/api/auth/signin?callbackUrl=${url.pathname}`);
  }
  // console.log('session:', session)


  if (!cookie.has('userProfile')) {
    const res = await prisma.user.findUnique({
      where: { id: Number(session.user.id) }
    })
    //@ts-ignore
    if (res?.nama?.length < 1) {
      throw redirect(
        302,
        `/user/profile/${res?.id}`);
    } else {
      
      cookie.set('userProfile', JSON.stringify(res))
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
  });
};

export default component$(() => {
  
  return (
    <>
      <Navbar />
      <div class="flex min-h-full items-center justify-center p-10 ">
        <Slot />
      </div>
    </>
  );
});
