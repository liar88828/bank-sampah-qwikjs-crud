import { Resource, component$ } from '@builder.io/qwik';
import { TUser } from '~/type/user';
import { useGetUser } from './layout';
import { Link } from '@builder.io/qwik-city';

// const useProfileFind = routeLoader$(async ({ sharedMap }) => {
//     const session: Session | null = sharedMap.get('session');
//     const id = Number(session?.user.id)
//     const res = await user.findId(Number(id))
//     return res
// })

export default component$(() => {
    const loadData = useGetUser()
    return <div>
        <Resource
            value={loadData}
            onPending={() => <span class="loading loading-spinner"></span>}
            onRejected={() => <span>Error</span>}
            onResolved={(data) => <Profile data={data as TUser} />}
        />
    </div>
});




export const Profile = component$(({ data }: {
    data: TUser
}) => {
    // console.log(data, 'profile')
    return <div class='static card bg-base-200 '>
        <div class="card-body">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="card-title">
                    User Profile
                </h3>
                <p class="mt-2">
                    This is some information about the user.
                </p>
            </div>
            {/* <div class="divider divider-neutral my-1"></div> */}

            <div class="border-t  px-4 py-5 sm:p-0 border-base-100">
                <dl class="divide-y divide-base-100">
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium ">
                            Full name
                        </dt>
                        <dd class="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                            {data.nama}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium ">
                            Email address
                        </dt>
                        <dd class="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                            {data.email}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium ">
                            Phone number
                        </dt>
                        <dd class="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                            {data.no_hp}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium ">
                            Address
                        </dt>
                        <dd class="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                            123 Main St<br />
                            {data.alamat}
                        </dd>
                    </div>
                    <div class="card-actions py-3 sm:py-5 sm:px-6 ">
                        <Link 
                        href='edit'
                        class='btn btn-warning'>Edit</Link>
                        <Link
                        href='print'
                        class='btn btn-primary'>Print</Link>
                        <button class='btn btn-info'>Info</button>
                    </div>
                </dl>

            </div>


        </div>

    </div>
});