import { component$ } from "@builder.io/qwik"
import { Form } from "@builder.io/qwik-city"
import { Instruction } from "~/components/basic/Instruction"
import { useUpdateUser } from "~/action/user.action"
import { type User_Status } from "~/type/db/table.type"

export const FormUpdateUser = component$(({ data }: { data: User_Status }) => {
  return (
    <div class="grid rounded-2xl bg-base-200 sm:grid-cols-2">
      <Instruction title={"profile"} />
      <FormUpdateUserChild data={data} />
    </div>
  )
})

export const FormUpdateUserChild = component$(
  ({ data }: { data: User_Status }) => {
    const dataUpdate = useUpdateUser()

    return (
      <div class="card static bg-base-100">
        <Form class="card-body items-center text-center" action={dataUpdate}>
          <h1 class="card-title">Update User : {data?.nama}</h1>

          <div class="grid w-full grid-cols-2 gap-2 text-left">
            <label class="form-control col-span-1">
              Nama Depan
              <input
                placeholder="Wajib : Paijo "
                name="nama"
                min={5}
                class="input input-bordered"
                value={data?.nama || dataUpdate.formData?.get("nama")}
              />
              {dataUpdate.value?.failed && (
                <p class="text-xs text-error">
                  Nama {dataUpdate.value.fieldErrors.nama}
                </p>
              )}
            </label>

            <label class="form-control col-span-1">
              Nama Belakang
              <input
                name="nama_belakang"
                class="input input-bordered"
                placeholder="optional"
                max={50}
                value={
                  data?.nama_belakang ??
                  dataUpdate.formData?.get("nama_belakang") ??
                  ""
                }
              />
              {dataUpdate.value?.failed && (
                <p class="text-xs text-error">
                  Nama {dataUpdate.value.fieldErrors.nama}
                </p>
              )}
            </label>
          </div>

          <div class="grid w-full grid-cols-1 gap-2 text-left">
            <label class="form-control ">
              Jenis Kelamin
              <select
                name="kelamin"
                class="input input-bordered"
                // @ts-ignore
                value={
                  data?.kelamin ?? dataUpdate.formData?.get("kelamin") ?? ""
                }
              >
                <option disabled selected>
                  Pilih Jenis Kelamin
                </option>
                <option value={"Laki-Laki"}> Laki-Laki</option>
                <option value={"Perempuan"}> Perempuan</option>
              </select>
              {dataUpdate.value?.failed && (
                <p class="text-xs text-error">
                  Jenis Kelamin {dataUpdate.value.fieldErrors.kelamin}
                </p>
              )}
            </label>
          </div>

          <div class="grid w-full grid-cols-2 gap-2 text-left">
            <label class="form-control">
              Tempat Lahir
              <input
                name="tempat_lahir"
                class="input input-bordered"
                value={
                  data?.tempat_lahir ?? dataUpdate.formData?.get("tempat_lahir")
                }
              />
              {dataUpdate.value?.failed && (
                <p class="text-xs text-error">
                  Alamat {dataUpdate.value.fieldErrors.alamat}
                </p>
              )}
            </label>

            <label class="form-control">
              Tanggal Lahir
              <input
                name="tanggal_lahir"
                class="input input-bordered"
                type="date"
                value={
                  new Date(data?.tanggal_lahir || 0).toISOString() ||
                  dataUpdate.formData?.get("tanggal_lahir")
                }
              />
              {dataUpdate.value?.failed && (
                <p class="text-xs text-error">
                  Tanggal Lahir {dataUpdate.value.fieldErrors.tanggal_lahir}
                </p>
              )}
            </label>
          </div>

          <div class="grid w-full grid-cols-2 gap-2 text-left">
            <label class="form-control">
              Email
              <input
                name="email"
                class="input input-bordered"
                min={9}
                max={12}
                value={data?.email || dataUpdate.formData?.get("email")}
              />
              {dataUpdate.value?.failed && (
                <p class="text-xs text-error">
                  Email {dataUpdate.value.fieldErrors.email}
                </p>
              )}
            </label>

            <label class="form-control">
              No Hp
              <input
                type="tel"
                name="no_hp"
                class="input input-bordered"
                min={9}
                max={13}
                value={data?.no_hp ?? dataUpdate.formData?.get("no_hp")}
              />
              {dataUpdate.value?.failed && (
                <p class="text-xs text-error">
                  No Hp {dataUpdate.value.fieldErrors.no_hp}
                </p>
              )}
            </label>
          </div>

          <div class="grid w-full grid-cols-1 gap-2 text-left">
            <label class="form-control">
              Alamat
              <textarea
                name="alamat"
                class="textarea textarea-bordered"
                minLength={10}
                value={data?.alamat ?? "" ?? dataUpdate.formData?.get("alamat")}
              ></textarea>
              {dataUpdate.value?.failed && (
                <p class="text-xs text-error">
                  Alamat {dataUpdate.value.fieldErrors.alamat}
                </p>
              )}
            </label>
          </div>

          <div class="grid w-full grid-cols-2 gap-2 text-left">
            <label class="form-control ">
              Pilih Bahasa
              <select
                name="bahasa"
                class="input input-bordered"
                value={data?.bahasa ?? dataUpdate.formData?.get("bahasa") ?? ""}
              >
                <option disabled selected>
                  Pilih Bahasa
                </option>
                <option value={"Indonesia"}>Indonesia</option>
                <option value={"England"}>England</option>
              </select>
              {dataUpdate.value?.failed && (
                <p class="text-xs text-error">
                  Pilih Bahasa {dataUpdate.value.fieldErrors.bahasa}
                </p>
              )}
            </label>

            <label class="form-control ">
              Pilih Tema
              <select
                name="tema"
                class="input input-bordered"
                value={data?.theme ?? dataUpdate.formData?.get("tema") ?? ""}
              >
                <option disabled selected>
                  Pilih Tema
                </option>
                <option value={"Light"}>Light</option>
                <option value={"Dark"}>Dark</option>
              </select>
              {dataUpdate.value?.failed && (
                <p class="text-xs text-error">
                  Pilih Tema {dataUpdate.value.fieldErrors.tema}
                </p>
              )}
            </label>
          </div>

          <div class="card-actions mt-5 w-full">
            <button type="submit" class="btn btn-info w-full">
              Update
            </button>
            {/*
        <Link
          href={`/table/users/detail/${data?.id}`}
          class="btn btn-primary "
        >
          Back
        </Link> */}
          </div>
        </Form>
      </div>
    )
  },
)
