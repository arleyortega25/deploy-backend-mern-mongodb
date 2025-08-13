import { z } from "zod";

export const registroSchema = z.object({
  usuario: z.string({
    required_error: "usuario es requerido",
  }),
  correo: z.string({
    required_error: "el correo es requerido",
  }).email({
    message:'correo invalido'
  }),
  contraseña: z.string({
    required_error:'la contraseña es requerida'
  }).min(6,{
    message:'la contraseña debe de tener almenos 6 caracteres'
  })
});

export const loginSchema = z.object({
    usuario: z.string({
        required_error: 'ingrese usuario'
    }),
    contraseña: z.string({
        required_error:'se requiere contraseña'
    }).min(6,{
         message: 'la contraseña debe tener al menos 6 caracteres'
    })
})