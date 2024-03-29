import {component$} from "@builder.io/qwik";
import {LuAlignJustify, LuBoxes, LuHome, LuPersonStanding} from "@qwikest/icons/lucide";
import {Link} from "@builder.io/qwik-city";

export const Navbar = component$(() => {
  return (<>
      <div class="drawer">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle"/>
        <div class="drawer-content flex flex-col">
          {/* Navbar */}
          
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
              {/* Navbar menu content here */}
              
              <NavbarList/>
            </div>
          </div>
          
          
          {/*<Slot>*/}
        </div>
        <div class="drawer-side">
          <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
          {/*Sidebar*/}
          <SidebarList/>
        </div>
      </div>
    </>
  
  )
  
})


const ListData = [
  {
    href: '/',
    text: 'Home',
    icon: <LuHome font-size={25} class="inline-block w-6 h-6 stroke-current"/>,
  },
  {
    href: '/users',
    text: 'Users',
    icon: <LuPersonStanding font-size={25} class="inline-block w-6 h-6 stroke-current"/>,
  },
  {
    href: '/material',
    text: 'Material',
    icon: <LuBoxes font-size={25} class="inline-block w-6 h-6 stroke-current"/>,
  },

]
export const SidebarList = component$(() => {
  return (
    <>
      <ul class="menu p-4 w-80 min-h-full bg-base-200">
        {/* Sidebar content here */}
        <li  class={'mb-10'}>Home</li>
        {ListData.map(d => (
          <li key={d.text} ><Link href={d.href}>{d.icon} {d.text}</Link></li>
        ))}
      </ul>
    </>
  
  )
})

export const NavbarList = component$(() => {
  return (
    <>
      <ul class="menu menu-horizontal">
        {ListData.map(d => (<>
            <li key={d.text}><Link href={d.href}>{d.text}</Link></li>
          </>
        ))}
      </ul>
    </>)
})



