import { z } from "zod";

const tareaSchema = z.object({
  titulo: z.string({
    required_error: "titulo requerido",
  }),
  descripcion: z.string({
    required_error: "descripcion requerida",
  }),
  fecha: z.string().datetime().optional(),
});

export default tareaSchema;
