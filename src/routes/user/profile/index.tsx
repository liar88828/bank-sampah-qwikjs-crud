import { Resource, component$ } from "@builder.io/qwik";
import { PropsProfile } from "~/type/user";
import { useLoaderData } from "./layout";
import { Link } from "@builder.io/qwik-city";
import {
  LuArrowLeftRight,
  LuBadgeDollarSign,
  LuBox,
} from "@qwikest/icons/lucide";

export default component$(() => {
  const loadData = useLoaderData();
  return (
    <div class="container">
      <Resource
        value={loadData}
        onPending={() => <span class="loading loading-spinner"></span>}
        onRejected={() => <span>Error</span>}
        onResolved={(data) => <Profile data={data} />}
      />
    </div>
  );
});

export const Profile = component$(
  ({ data: { user, point } }: { data: PropsProfile }) => {
    // console.log(data, 'profile')
    return (
      <div class="card static bg-base-100 ">
        <div class="card-body">
          <div class="px-4 py-5 sm:px-6">
            <h2 class="card-title">User Profile</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, cum.
            </p>
          </div>
          {/* <div class="divider divider-neutral my-1"></div> */}

          <div class="border-t  border-base-100 px-4 py-5 sm:p-0">
            <dl class="divide-y divide-base-100">
              <div class="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt class="text-sm font-medium ">Full name</dt>
                <dd class="mt-1 text-sm  sm:col-span-2 sm:mt-0">{user.nama}</dd>
              </div>
              <div class="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt class="text-sm font-medium ">Email address</dt>
                <dd class="mt-1 text-sm  sm:col-span-2 sm:mt-0">
                  {user.email}
                </dd>
              </div>
              <div class="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt class="text-sm font-medium ">Phone number</dt>
                <dd class="mt-1 text-sm  sm:col-span-2 sm:mt-0">
                  {user.no_hp}
                </dd>
              </div>

              <div class="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt class="text-sm font-medium ">Address</dt>
                <dd class="mt-1 text-sm  sm:col-span-2 sm:mt-0">
                  123 Main St
                  <br />
                  {user.alamat}
                </dd>
              </div>

              <div class="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt class="text-lg font-bold">Total Transaksi : </dt>

                <dd class="mt-1  flex w-full flex-wrap gap-2  sm:col-span-2 sm:mt-0">
                  <Link href="transaksi?page=0" class="btn btn-primary btn-sm">
                    Transaksi
                    <LuArrowLeftRight />
                    {point.totalTransaksi}
                  </Link>
                  <Link href="penukaran?page=0" class="btn btn-info btn-sm">
                    Penukaran
                    <LuBadgeDollarSign />
                    {point.totalBeli}
                  </Link>
                  <Link href="material?page=0" class="btn btn-warning btn-sm">
                    Material
                    <LuBox />
                    {point.totalMaterial}
                  </Link>
                </dd>
              </div>
              <div class="card-actions py-3 sm:px-6 sm:py-5 ">
                <Link href="edit" class="btn btn-warning">
                  Edit
                </Link>
                <Link href="print" class="btn btn-primary">
                  Print
                </Link>
                <Link href="info" class="btn btn-info">
                  Info
                </Link>
                <Link href="penyerahan" class="btn btn-secondary">
                  Penyerahan
                </Link>
              </div>
            </dl>
          </div>
        </div>
      </div>
    );
  },
);
