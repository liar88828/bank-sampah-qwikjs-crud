import { component$ } from "@builder.io/qwik"
import { Form } from "@builder.io/qwik-city"
import { useCreateUser } from "~/action/user.action"

export const FormCreateUser = component$(() => {
  const dataCreate = useCreateUser()

  return (
    <div class="card static bg-base-100">
      <Form class="card-body items-center text-center" action={dataCreate}>
        <h1 class="card-title">Create User </h1>

        <div class="grid w-full grid-cols-2 gap-2 text-left">
          <label class="form-control col-span-1">
            Nama Depan
            <input
              placeholder="Wajib : Paijo "
              name="nama"
              min={5}
              class="input input-bordered"
              value={dataCreate.formData?.get("nama")}
            />
            {dataCreate.value?.failed && (
              <p>Nama {dataCreate.value.fieldErrors.nama}</p>
            )}
          </label>

          <label class="form-control col-span-1">
            Nama Belakang
            <input
              name="nama_belakang"
              class="input input-bordered"
              placeholder="optional"
              max={50}
              value={dataCreate.formData?.get("nama_belakang")}
            />
            {dataCreate.value?.failed && (
              <p>Nama {dataCreate.value.fieldErrors.nama}</p>
            )}
          </label>
        </div>

        <div class="grid w-full grid-cols-1 gap-2 text-left">
          <label class="form-control ">
            Jenis Kelamin
            <select
              name="kelamin"
              class="input input-bordered"
              //@ts-ignore
              value={dataCreate.formData?.get("kelamin")}
            >
              <option disabled selected>
                Pilih Jenis Kelamin
              </option>
              <option value={"Laki-Laki"}> Laki-Laki</option>
              <option value={"Perempuan"}> Perempuan</option>
            </select>
            {dataCreate.value?.failed && (
              <p>Jenis Kelamin {dataCreate.value.fieldErrors.kelamin}</p>
            )}
          </label>
        </div>

        <div class="grid w-full grid-cols-2 gap-2 text-left">
          <label class="form-control">
            Tempat Lahir
            <input
              name="tempat_lahir"
              class="input input-bordered"
              value={dataCreate.formData?.get("tempat_lahir")}
            />
            {dataCreate.value?.failed && (
              <p>Alamat {dataCreate.value.fieldErrors.alamat}</p>
            )}
          </label>

          <label class="form-control">
            Tanggal Lahir
            <input
              name="tanggal_lahir"
              class="input input-bordered"
              type="date"
              value={
                new Date("").toISOString() ||
                dataCreate.formData?.get("tanggal_lahir")
              }
            />
            {dataCreate.value?.failed && (
              <p>Tanggal Lahir {dataCreate.value.fieldErrors.tanggal_lahir}</p>
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
              value={dataCreate.formData?.get("email")}
            />
            {dataCreate.value?.failed && (
              <p>Email {dataCreate.value.fieldErrors.email}</p>
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
              value={dataCreate.formData?.get("no_hp")}
            />
            {dataCreate.value?.failed && (
              <p>No Hp {dataCreate.value.fieldErrors.no_hp}</p>
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
              //@ts-ignore
              value={dataCreate.formData?.get("alamat") ?? ""}
            ></textarea>
            {dataCreate.value?.failed && (
              <p>Alamat {dataCreate.value.fieldErrors.alamat}</p>
            )}
          </label>
        </div>

        <div class="grid w-full grid-cols-2 gap-2 text-left">
          <label class="form-control ">
            Pilih Bahasa
            <select
              name="bahasa"
              class="input input-bordered"
              //@ts-ignore
              value={dataCreate.formData?.get("bahasa")}
            >
              <option disabled selected>
                Pilih Bahasa
              </option>
              <option value={"Indonesia"}>Indonesia</option>
              <option value={"England"}>England</option>
            </select>
            {dataCreate.value?.failed && (
              <p>Pilih Bahasa {dataCreate.value.fieldErrors.bahasa}</p>
            )}
          </label>

          <label class="form-control ">
            Pilih Tema
            <select
              name="tema"
              class="input input-bordered"
              //@ts-ignore
              value={dataCreate.formData?.get("tema")}
            >
              <option disabled selected>
                Pilih Tema
              </option>
              <option value={"Light"}>Light</option>
              <option value={"Dark"}>Dark</option>
            </select>
            {dataCreate.value?.failed && (
              <p>Pilih Tema {dataCreate.value.fieldErrors.tema}</p>
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
})
