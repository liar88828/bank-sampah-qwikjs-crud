import {$, component$, QRL, useSignal, useStore} from '@builder.io/qwik';
import {LuBoxes, LuHome, LuPersonStanding} from "@qwikest/icons/lucide";
import {Link} from "@builder.io/qwik-city";

const menuItems = [
  {href: '/home', icon: <LuHome font-size={25} class="mr-4"/>, text: "Home"},
  {href: '/material', icon: <LuBoxes font-size={25} class="mr-4"/>, text: "Material"},
  {href: '/users', icon: <LuPersonStanding font-size={25} class="mr-4"/>, text: "User"},
];
type TSidebar = {
  open: boolean,
  setOpen: QRL<(this: TSidebar) => void>
}

export const Sidebar2 = component$(() => {

    const openSide = useSignal(true);

    const openSidebar = useStore<TSidebar>({
      open: false,
      setOpen: $(function (this: TSidebar) {
        this.open = !this.open
      })
    })

// console.log(openSide.value, 'openside')
    console.log(openSidebar.open, 'openside')


    return (
      <>
        <div class="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" class="drawer-toggle"/>
          <div class="drawer-content flex flex-col items-center justify-center">
            {!openSidebar.open &&
                <button
                    class={'btn btn-info'}
                    onClick$={() => {
                      openSidebar.setOpen()
                    }}
                >Open
                </button>
            }
            {/*<label for="my-drawer-2"*/}
            {/*	   class="btn btn-primary drawer-button lg:hidden">Open drawer</label>*/}

          </div>
          {
            openSidebar.open
            && <>
                  <div class="drawer-side">

                    {/*<label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>*/}

                      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                          <li class={'mb-10'}>
                              <button
                                  class={'btn btn-error'}

                                  onClick$={() => {
                                    openSidebar.setOpen()
                                  }}
                              >Close
                              </button>
                          </li>

                          <li><Link href={'/'}>Sidebar Item 1</Link></li>
                          <li><Link href={'/'}>Sidebar Item 2</Link></li>
                      </ul>
                  </div>
              </>
          }
        </div>
      </>


    );
  })
;