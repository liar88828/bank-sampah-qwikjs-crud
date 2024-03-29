import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$, z, zod$, } from "@builder.io/qwik-city";
import { deleteMaterial, findIdMaterial, } from "~/db/material";

export const useGetId = routeLoader$(async ({ params, status }) => {
  const id = parseInt(params["id"], 10);
  const material = findIdMaterial(id);

  if (!material) {
	status(404);
  }
  return material;
});

export const useDelete = routeAction$(
  async (data, { redirect }) => {
	const material = await deleteMaterial(Number(data.id));
	if (material) {
	  throw redirect(302, "/material");
	}
	return material;
  },
  zod$({ id: z.string() }),
);

export default component$(() => {
  const { value: material } = useGetId();
  const deleteMaterial = useDelete();
  return (
	<section>
	  { material ? (
		<>
		  <div class="card w-96 bg-base-300 shadow-xl">
			<div class="card-body">
			  <h1 class="card-title">Material : { material.nama }</h1>

			  <p>Berat : { material.berat }</p>

			  <div class="card-actions ">
				<Link href={ `/material/edit/${ material.id }` } class="btn btn-info">
				  Edit
				</Link>

				<Form action={ deleteMaterial }>
				  <input type="hidden" value={ material.id } name={ "id" }/>

				  <button class="btn btn-error" type="submit">
					Delete
				  </button>
				</Form>
				<Link href={ `/material/` } class="btn btn-primary">
				  Back
				</Link>
			  </div>
			</div>
		  </div>
		</>
	  ) : (
		<p>Material not found</p>
	  ) }
	</section>
  );
});
