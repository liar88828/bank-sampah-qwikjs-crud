import { component$ } from "@builder.io/qwik";
import { routeLoader$, z } from "@builder.io/qwik-city";
import {
  InitialValues,
  formAction$,
  useForm,
  zodForm$,
} from "@modular-forms/qwik";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Note: you can also use z.input
// since Zod supports data transformation.
type LoginForm = z.infer<typeof formSchema>;

export const useLoginForm = routeLoader$<InitialValues<LoginForm>>(({}) => ({
  email: "",
  password: "",
}));

export const useFormAction = formAction$<LoginForm>((values) => {
  // Runs on server
  console.log(values);
  // This validates the values on the server side.
  // And cannot be manipulated by an attacker. ✅
}, zodForm$(formSchema));

export default component$(() => {
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: useLoginForm(),
    validate: zodForm$(formSchema),
    action: useFormAction(),
  });

  return (
    <section class="p-4">
      <h1>Qwik Modular Forms</h1>
      <Form class="flex flex-col gap-2">
        <Field name="email">
          {(field, props) => (
            <>
              <input
                class="w-96"
                placeholder="enter email"
                {...props}
                type="email"
              />
              {field.error && <div>{field.error}</div>}
            </>
          )}
        </Field>
        <Field name="password">
          {(field, props) => (
            <>
              <input
                class={"w-96"}
                placeholder="enter password"
                {...props}
                type="password"
              />
              {field.error && <div>{field.error}</div>}
            </>
          )}
        </Field>
        <button class="w-max" type="submit">
          Login
        </button>
      </Form>
    </section>
  );
});
