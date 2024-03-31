import {component$} from "@builder.io/qwik";
import {
  LuAlignJustify,
  LuArrowLeftRight,
  LuBadgeDollarSign,
  LuBoxes,
  LuHistory,
  LuHome,
  LuPersonStanding
} from "@qwikest/icons/lucide";
import {Link} from "@builder.io/qwik-city";


const ListData = [
  {
    href: '/home',
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
  {
    href: '/transaksi',
    text: 'Transaksi',
    icon: <LuBadgeDollarSign font-size={25} class="inline-block w-6 h-6 stroke-current"/>,
  },
  
  {
    href: '/opsi-penukaran',
    text: 'Opsi Penukaran',
    icon: <LuArrowLeftRight font-size={25} class="inline-block w-6 h-6 stroke-current"/>,
  },
  {
    href: '/riwayat-penukaran',
    text: 'Riwayat Penukaran',
    icon: <LuHistory font-size={25} class="inline-block w-6 h-6 stroke-current"/>,
  },

]


export const Navbar = component$(() => {
  return (<>
      <div class="navbar bg-base-200">
        <div class="navbar-start">
          
          <SideBar/>
        
        </div>
        <div class="navbar-center">
          <Link href={'/'} class="btn btn-ghost text-xl">daisyUI</Link>
        </div>
        <div class="navbar-end">
          
          <ListMenu/>
        </div>
      </div>
    </>
  
  )
  
})


export const Search = component$(() => {
  return (
    <>
      <button class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
    </>
  )
})
export const ListMenu = component$(() => {
  return (
    <>
      {/*List */}
      <ul class="menu menu-horizontal px-1">
        <li><Link href={'/'} >Link</Link></li>
        <li>
          <details>
            <summary>
              Parent
            </summary>
            <ul class="p-2 bg-base-100 rounded-t-none">
              <li><Link href={'/'}>Link 1</Link></li>
              <li><Link href={'/'}>Link 2</Link></li>
            </ul>
          </details>
        </li>
      </ul>
    
    </>
  )
})
export const CartList = component$(() => {
  return (<>
      {/* Chart */}
      <div class="dropdown dropdown-end">
        <div tabIndex={0} role="button" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="badge badge-sm indicator-item">8</span>
          </div>
        </div>
        <div tabIndex={0} class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
          <div class="card-body">
            <span class="font-bold text-lg">8 Items</span>
            <span class="text-info">Subtotal: $999</span>
            <div class="card-actions">
              <button class="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  
  )
})
export const SideBar = component$(() => {
  return <>
    <div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle"/>
      <div class="drawer-content">
        {/* Page content here */}
        <label for="my-drawer" class=" drawer-button btn btn-square btn-ghost
        ">
          <LuAlignJustify font-size={25}
                          class="inline-block w-6 h-6 stroke-current"
          />
        
        </label>
      
      </div>
      <div class="drawer-side">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li class={'mb-10'}>Home</li>
          {ListData.map(d => (<>
              <li key={d.text}><Link href={d.href}> {d.icon} {d.text}</Link></li>
            </>
          ))}
        
        </ul>
      </div>
    </div>
  </>
})