import {type HTMLInputTypeAttribute, component$ } from "@builder.io/qwik";

export const Input = component$(
  ({
    value,
    error,
    title,
    key,
    type,
    message,
    placeholder,
  }: {
    key: string;
    placeholder: string;
    type: HTMLInputTypeAttribute;
    title: string;
    value: string | number|undefined|any
    error: boolean | undefined;
    message: string[] | undefined;
  }) => {
    return (
      <label class="form-control">
        {title}
        <input
          placeholder={placeholder}
          type={type}
          name={key}
          class="input input-bordered"
          value={value}
        />
        {error && (
          <p class="text-sm text-red-500">
            {title} {message}
          </p>
        )}
      </label>
    );
  },
);
// usage
{/* 
<Input
  title="Nama"
  type="text"
  value={data?.nama || updateUserAction.formData?.get("nama")}
  key="name"
  error={updateUserAction.value?.failed}
  message={updateUserAction.value?.fieldErrors?.nama}
  placeholder="Masukkan Nama : Paijo"
/> */}