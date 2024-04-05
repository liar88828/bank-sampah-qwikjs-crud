import { $, QRL, component$, useSignal, useTask$ } from "@builder.io/qwik";
import {
  Form as ActionForm,
  globalAction$,
  routeLoader$,
  z,
} from "@builder.io/qwik-city";
import {
  InitialValues,
  formAction$,
  insert,
  maxLength,
  remove,
  required,
  useForm,
  zodForm$,
} from "@modular-forms/qwik";
import { formSchema } from "~/lib/Zod";

export const NumberInput = component$(({ value, ...props }: TextInputProps) => {
  // Update signal if value is not `NaN`
  const input = useSignal<string | number>();
  useTask$(({ track }) => {
    if (!Number.isNaN(track(() => value))) {
      input.value = value;
    }
  });
  return <input {...props} type="number" value={input.value} />;
});

const defaultForm = {
  id_user: "",
  status: "",
  sampah: [
    {
      berat: 0,
      jenis: "",
      nama: "",
    },
  ],
};

const getInitFormValues = (): InitialValues<TodoForm> => defaultForm;

export type TodoForm = z.infer<typeof formSchema>;

export const useLoginForm = routeLoader$<InitialValues<TodoForm>>(
  ({}) => defaultForm,
);

export const useFormAction = formAction$<TodoForm>((values) => {
  console.log(values);
}, zodForm$(formSchema));

export default component$(() => {
  const [todoForms, { Form, Field, FieldArray }] = useForm<TodoForm>({
    loader: useLoginForm(),
    validate: zodForm$(formSchema),
    action: useFormAction(),
    fieldArrays: ["sampah"],
  });

  return (
    <section class="p-4">
      <h1>Qwik Modular Forms</h1>
      <Form class="">
        <Field name="id_user">
          {(field, props) => (
            <>
              <input
                class="input input-bordered"
                placeholder="Masukan User"
                {...props}
                type="email"
              />
              {field.error && <div>{field.error}</div>}
            </>
          )}
        </Field>

        <Field name="status">
          {(field, props) => (
            <select {...props} class="select select-bordered">
              {["data", "data2"].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          )}
        </Field>

        <FieldArray
          name="sampah"
          validate={[
            required<string>("Please add at least one todo."),
            maxLength(4, "You can add a maximum of 4 ."),
          ]}
        >
          {(fieldArray) => (
            <div class="" id={fieldArray.name}>
              <div class="space-x-2">
                <label for="" class="text-xl font-bold">
                  Input Data
                </label>

                <button
                  class="btn btn-info"
                  onClick$={() => {
                    insert(todoForms, "sampah", {
                      value: { berat: 0, jenis: "", nama: "" },
                    });
                  }}
                >
                  Add
                </button>
              </div>
              <div>
                <div class="">
                  {fieldArray.items.map((item, index) => (
                    <div key={item} class="rounded bg-base-200 p-5">
                      <Field
                        name={`sampah.${index}.nama`}
                        validate={required<string>("Please enter a label.")}
                      >
                        {(field, props) => (
                          <>
                            <input
                              class="input input-bordered"
                              placeholder="Masukan Nama"
                              {...props}
                              type="text"
                            />
                            {field.error && <div>{field.error}</div>}
                          </>
                        )}
                      </Field>

                      <Field name={`sampah.${index}.berat`} type="number">
                        {(field, props) => {
                          return (
                            <NumberInput
                              {...props}
                              value={field.value}
                              error={field.error}
                              type="number"
                              label="Number"
                              placeholder="Masukan Berat"
                              class="input input-bordered"
                            />
                          );
                        }}
                      </Field>

                      <Field
                        name={`sampah.${index}.jenis`}
                        validate={required<string>("Please enter a label.")}
                      >
                        {(field, props) => (
                          <>
                            <input
                              class="input input-bordered"
                              placeholder="Masukan Jenis"
                              {...props}
                              type="text"
                            />
                            {field.error && <div>{field.error}</div>}
                          </>
                        )}
                      </Field>

                      <button
                        class="btn btn-error"
                        onClick$={() => {
                          remove(todoForms, "sampah", { at: index });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </FieldArray>

        <button class="btn btn-info" type="submit">
          Login
        </button>
      </Form>
    </section>
  );
});

type TextInputProps = {
  ref: QRL<(element: HTMLInputElement) => void>;
  type: "text" | "email" | "tel" | "password" | "url" | "number" | "date";
  name: string;
  value: string | number | undefined;
  onInput$: (event: Event, element: HTMLInputElement) => void;
  onChange$: (event: Event, element: HTMLInputElement) => void;
  onBlur$: (event: Event, element: HTMLInputElement) => void;
  placeholder?: string;
  required?: boolean;
  class?: string;
  label?: string;
  error?: string;
  form?: string;
};

type ColorButtonProps = {
  type?: "button" | "submit";
  class?: string;
  label: string;
  onClick$: () => void;
  width?: "auto";
};

export const ColorButton = component$(
  ({ type = "button", label, onClick$, width, ...props }: ColorButtonProps) => (
    <button
      {...props}
      type={type}
      preventdefault:click={type === "submit"}
      onClick$={onClick$}
    >
      {label}
    </button>
  ),
);
