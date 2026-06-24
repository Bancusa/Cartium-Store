import { z } from 'zod';
//ESTE ARCHIVO REQUIERE INSTALACION POR CONSOLA
// npm install zod
// definimos exactamente que datos permitimos para registrar un usuario
export const registroUserSchema = z.object({
  nombre: z.string({ message: "el nombre es obligatorio" })
    .min(2, "el nombre debe tener al menos 2 caracteres")
    .max(100, "nombre demasiado largo"),
  apellido: z.string({ message: "el apellido es obligatorio" })
    .min(2, "el apellido debe tener al menos 2 caracteres")
    .max(100, "apellido demasiado largo"),
  email: z.string({ message: "el email es obligatorio" })
    .email("el formato del email no es valido"),
  password: z.string({ message: "la contrasenia es obligatoria" })
    .min(6, "la contrasenia debe tener al menos 6 caracteres"),
  dni: z.string({ message: "el dni es obligatorio" })
    .min(6, "el dni debe tener al menos 6 caracteres")
    .max(20, "dni demasiado largo"),
  direccion: z.string({ message: "la direccion es obligatoria" })
    .min(5, "la direccion debe ser mas especifica")
});