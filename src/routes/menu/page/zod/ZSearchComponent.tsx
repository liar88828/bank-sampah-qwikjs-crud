import { z, zod$ } from "@builder.io/qwik-city";


export const ZSearchComponent = zod$({
  search: z.string().optional(),
  jenis: z.string().optional(),
  page: z.number().optional(),
});export const ZSearchNasabah = zod$({
  search: z.string().optional(),
  page: z.number().optional(),
});

