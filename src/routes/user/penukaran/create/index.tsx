import { $, QRL, Resource, component$, useSignal } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { LuSearch, LuXCircle } from "@qwikest/icons/lucide";
import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { MaterialTransaction } from "~/type/transaksi.type";
import {
  useAddCart,
  useCheckOutPenukaran,
  useDeleteCart,
  useFindCart,
  useLoadCartPenukaran,
} from "./layout";
import { getDate } from "~/lib/date";
import { kiloGram } from "~/lib/formatWeight";
import { Spinner } from "~/components/loading/spinner";

export default component$(() => {
  // console.log(local)

  return (
    <section class="container space-y-3">
      <Heads />
      <div class="  md:grid md:grid-cols-3">
        <div class="col-span-2 bg-base-100">
          <Tables />
        </div>
        <div class="col-span-1  bg-base-200">
          <Cart />
        </div>
      </div>
    </section>
  );
});

export const Heads = component$(() => {
  return <Breadcrumbs data={getBreadcrumbTrail("Create-Penukaran")} />;
});

export const Tables = component$(() => {
  const dataLoad = useLoadCartPenukaran();
  const dataAdd = useAddCart();

  const handlerAdd = $(async (id: number) => {
    dataAdd.submit({ id_cart: id });
  });
  const loading = dataAdd.isRunning;

  return (
    <Resource
      value={dataLoad}
      onPending={() => <Spinner />}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => {
        // console.log(loading);
        // if (loading) {
        //   return (
        //     <div class="flex justify-center">
        //       <Spinner />
        //     </div>
        //   );
        // }

        return (
          <TableComponent
            data={data}
            handlerAdd={handlerAdd}
            href="/user/penukaran/create/"
            loading={loading}
          />
        );
      }}
    />
  );
});

export const TableComponent = component$(
  ({
    data,
    handlerAdd,
    href,
    loading,
  }: {
    href: string;
    data: MaterialTransaction[];
    handlerAdd: QRL<(id: number) => Promise<void>>;
    loading: boolean;
  }) => {
    const search = useSignal("");
    const local = useLocation();
    const page = local.url.searchParams.get("page");
    let buttonOff = data.length === 0;
    let buttonLess = data.length > 0;

    return (
      <div class="card static bg-base-100 sm:card-compact">
        <div class="card-body">
          <div class=" flex items-center gap-2">
            <h1>Material</h1>
            {/* <Link class="btn btn-info btn-xs" href={href}>
              Create
            </Link> */}
          </div>

          <div class="overflow-x-auto">
            <table class="table table-zebra table-xs static  rounded bg-base-100">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kode</th>
                  <th>Nama</th>
                  <th>Kategori</th>
                  <th>Berat</th>
                  <th>Create</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={d.id}>
                    <th>{i + 1}</th>
                    <td>{d.id}</td>
                    <td>{d.nama}</td>
                    <td>{d.kategori}</td>
                    <td>{d.berat}</td>
                    <td>{getDate(d.createdAt)}</td>
                    <td class="flex flex-wrap gap-2">
                      <button
                        class={`btn btn-primary btn-xs ${loading && "btn-disabled"}`}
                        onClick$={() => handlerAdd(d.id)}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={3}>
                    <div class="join">
                      <Link
                        // aria-disabled={buttonOff}
                        href={`${href}?page=${Number(page) - 1}`}
                        class={`btn join-item btn-sm ${buttonLess && "btn-disabled"}`}
                      >
                        «
                      </Link>
                      <button class="btn join-item btn-sm">Page {page}</button>
                      <Link
                        aria-disabled={buttonOff}
                        href={`${href}?page=${Number(page) + 1}`}
                        class={`btn join-item btn-sm ${buttonOff && "btn-disabled"}`}
                      >
                        »
                      </Link>
                    </div>
                  </th>
                  <th colSpan={3} class="">
                    <input
                      //@ts-ignore
                      list="search_name"
                      type="text"
                      class="input input-sm input-bordered"
                      placeholder="Cari Nama : Alex...."
                      bind:value={search}
                    />
                    <datalist id="search_name">
                      {data.map((d, i) => {
                        return <option value={d.nama} key={d.id} />;
                      })}
                    </datalist>
                    <Link
                      type="button"
                      class="btn btn-square btn-primary btn-sm"
                      href={`${href}/?page=${Number(page)}&search=${search.value} `}
                    >
                      <LuSearch />
                    </Link>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  },
);

export const Cart = component$(() => {
  const loadCart = useFindCart();
  const dataDelete = useDeleteCart();
  const dataCheckOut = useCheckOutPenukaran();

  const handlerDelete = $(async (id: number) => {
    dataDelete.submit({ id_cartList: id });
  });

  const handlerCheckOut = $(async (id: number, totalBerat: number) => {
    dataCheckOut.submit({
      id_trolly: id,
      berat: totalBerat,
      deskripsi: "Simpan",
    });
  });

  return (
    <Resource
      value={loadCart}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={({ res: data, totalBerat, totalCart }) => {
        if (!data) return <h1>Kosong</h1>;

        const loading = dataDelete.isRunning;

        return (
          <div class="card static">
            <div class="card-body">
              <div class="mb-4 flex items-center justify-between">
                <h2 class="text-lg font-medium">Cart</h2>
                <div class="text-gray-500">{totalCart} items</div>
              </div>
              <div class="space-y-4">
                {data.Cases.map(({ Material: d, id }) => (
                  <div key={d?.id} class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      {/* <img
                alt="Product Image"
                class="rounded-md"
                height={48}
                src="https://picsum.photos/id/237/200/300"
                style={{
                  aspectRatio: "48/48",
                  objectFit: "cover",
                }}
                width={48}
              /> */}
                      <div>
                        <div class="font-medium">{d?.nama}</div>
                        <div class="text-gray-500">
                          {kiloGram(d?.berat ?? 0)}
                        </div>
                      </div>
                    </div>
                    <button
                      class={`btn btn-square btn-primary h-8 w-8  ${loading && "btn-disabled"}`}
                      onClick$={() => handlerDelete(id)}
                    >
                      <LuXCircle font-size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <div class="my-4" />
              <div class="flex items-center justify-between">
                <div class="font-medium">Total</div>
                <div class="font-medium">{kiloGram(totalBerat)}</div>
              </div>

              <button
                onClick$={() => handlerCheckOut(data.id, totalBerat)}
                class={`btn btn-info ${loading && "btn-disabled"}`}
              >
                Checkout
              </button>
            </div>
          </div>
        );
      }}
    />
  );
});
