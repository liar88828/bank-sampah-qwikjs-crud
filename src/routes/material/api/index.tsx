import { RequestHandler } from "@builder.io/qwik-city";
import { createMaterial, deleteMaterial, findAllMaterial, findIdMaterial, updateMaterial } from "~/db/material";

export const onGet: RequestHandler = async ({ json, query }) => {
  const id = query.get("id");
  if (id) {
	console.log('true ' + id)
	json(200, { data: await findIdMaterial(Number(id)) });

  } else {
	json(200, { data: await findAllMaterial() });
  }
};

export const onPost: RequestHandler = async ({ json, request, }) => {
  const data = await request.json()
  const res = await createMaterial(data)
  json(200, { data: res });
};

export const onPut: RequestHandler = async ({ json, query, request }) => {
  const id = query.get("id");
  const data = await request.json()
  const res = await updateMaterial(Number(id), data)
  json(200, { data: res });
};

export const onDelete: RequestHandler = async ({ json, query }) => {
  const id = query.get("id");
  json(200, { data: await deleteMaterial(Number(id)) });

};
