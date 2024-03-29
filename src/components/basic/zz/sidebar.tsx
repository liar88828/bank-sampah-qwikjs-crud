import {component$} from '@builder.io/qwik';
import {LuAlignJustify, LuBoxes, LuHome, LuPersonStanding} from "@qwikest/icons/lucide";
import {Link} from "@builder.io/qwik-city";


export const Sidebar = component$(() => {
    
    
    return (<>
        <div class="w-full navbar bg-base-300">
          <div class="flex-none lg:hidden">
            
            <label for="my-drawer-3"
                   aria-label="open sidebar"
                   class="btn btn-square btn-ghost">
              <LuAlignJustify font-size={25}
                              class="inline-block w-6 h-6 stroke-current"
              />
            </label>
          
          </div>
          <div class="flex-1 px-2 mx-2">Navbar Title</div>
          <div class="flex-none hidden lg:block">
            <ul class="menu menu-horizontal">
              {/* Navbar menu content here */}
              
              <li class={'mb-10'}>Home</li>
              <li><Link href={'/'}>
                <LuHome
                  font-size={25}
                  class="inline-block w-6 h-6 stroke-current"
                />
                Home
              </Link></li>
              
              <li>
                <Link href={'/users'}>
                  <LuPersonStanding font-size={25}
                                    class="inline-block w-6 h-6 stroke-current"
                  />
                  User</Link>
              </li>
              
              <li><Link href={'/material'}>
                <LuBoxes
                  font-size={25}
                  class="inline-block w-6 h-6 stroke-current"
                />
                Material
              </Link></li>
            
            </ul>
          </div>
        </div>
      </>
    
    );
  })
;