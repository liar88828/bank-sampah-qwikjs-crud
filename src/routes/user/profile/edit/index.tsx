import { component$ } from "@builder.io/qwik";
import {
    routeAction$,
    zod$,
    Form,
    z,
    Link,
} from "@builder.io/qwik-city";
import { user } from "~/db/users";
import { useGetUser } from "../layout";
import { Session } from "@auth/core/types";



export const useUpdateUser = routeAction$(
    async (data, { redirect, params, sharedMap }) => {
        const session: Session | null = sharedMap.get("session");
        const id = Number(session?.user.id);
        const res = await user.updateOne(id, data);
        if (res) {
            throw redirect(302, `/user/profile/`);
        }
        return res;
    },
    zod$({
        email: z.string().email(),
        alamat: z.string().min(1).max(30),
        no_hp: z.string().min(1).max(30),
        nama: z.string().min(1).max(30),
    }),
);

export default component$(() => {
    const updateUserAction = useUpdateUser();
    const userData = useGetUser();
    console.log(userData.value);
    return (
        <section class="card bg-base-300">
            <Form
                class="text-center card-body items-center"
                action={updateUserAction}
            >
                <h1 class="card-title">Update User : {userData.value?.nama}</h1>

                <label class="form-control">
                    Nama
                    <input
                        name="nama"
                        class="input input-bordered"
                        value={
                            userData.value?.nama || updateUserAction.formData?.get("nama")
                        }
                    />
                </label>

                <label class="form-control">
                    Alamat
                    <input
                        name="alamat"
                        class="input input-bordered"
                        value={
                            userData.value?.alamat || updateUserAction.formData?.get("alamat")
                        }
                    />
                </label>

                <label class="form-control">
                    No Hp
                    <input
                        type="tel"
                        name="no_hp"
                        class="input input-bordered"
                        value={
                            userData.value?.no_hp || updateUserAction.formData?.get("np_hp")
                        }
                    />
                </label>

                <label class="form-control">
                    Email
                    <input
                        name="email"
                        class="input input-bordered"
                        value={
                            userData.value?.email || updateUserAction.formData?.get("email")
                        }
                    />
                </label>
                <div class="card-actions">
                    <button type="submit" class="btn btn-success">
                        Update
                    </button>

                    <Link
                        href={`/table/users/detail/${userData.value?.id}`}
                        class="btn btn-primary "
                    >
                        Back
                    </Link>
                </div>
            </Form>
            {!updateUserAction.value?.failed && (
                <div>
                    <h2>User Update successfully!</h2>
                </div>
            )}

            {updateUserAction.value?.failed && (
                <p>Email {updateUserAction.value.fieldErrors.email}</p>
            )}
            {updateUserAction.value?.failed && (
                <p>Nama {updateUserAction.value.fieldErrors.nama}</p>
            )}
            {updateUserAction.value?.failed && (
                <p>No Hp {updateUserAction.value.fieldErrors.no_hp}</p>
            )}
            {updateUserAction.value?.failed && (
                <p>Alamat {updateUserAction.value.fieldErrors.alamat}</p>
            )}
        </section>
    );
});
