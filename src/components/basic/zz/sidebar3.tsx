import {$, component$, QRL, useSignal, useStore} from '@builder.io/qwik';
import {LuBoxes, LuHome, LuPersonStanding} from "@qwikest/icons/lucide";
import {Link} from "@builder.io/qwik-city";

const menuItems = [
  { href: '/home', icon: <LuHome font-size={ 25 } class="mr-4"/>, text: "Home" },
  { href: '/material', icon: <LuBoxes font-size={ 25 } class="mr-4"/>, text: "Material" },
  { href: '/users', icon: <LuPersonStanding font-size={ 25 } class="mr-4"/>, text: "User" },
];
type TSidebar = {
  open: boolean,
  setOpen: QRL<(this: TSidebar) => void>
}

export const Sidebar = component$(({ open }: { open: boolean }) => {

	const openSide = useSignal(true);

	const openSidebar = useStore<TSidebar>({
	  open: false,
	  setOpen: $(function (this: TSidebar) {
		this.open = !this.open
	  })
	})

// console.log(openSide.value, 'openside')
	console.log(openSidebar.open, 'openside')
	return (<div class={'bg-slate-300'}>


		<button
		  onClick$={ () => {
			// openSidebar.setOpen()
			openSide.value = !openSide.value
		  }
		  }
		  class={ 'btn btn-info' }>open
		</button>

		{ openSide.value
		  &&
					<div class={ 'bg-white ml-20' }>
						<h2 class="text-2xl p-4">
							Best <span class="font-bold">Eats</span>
						</h2>
						<div class="">
							<ul class="flex flex-col p-4 text-gray-800">

				{ menuItems.map(({ href, icon, text }, index) => {
				  return (
					<div key={ index } class=" py-4">
					  <li
					  >
						<Link href={ href }
							  class="flex hover:bg-blue-200 rounded items-center p-3"

						>

						  { icon } { text }
						</Link>
					  </li>
					</div>
				  );
				}) }
							</ul>
						</div>
					</div>

		}
	  </div >

	);
  })
;