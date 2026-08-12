import { z } from "zod";

/**
 * UUID generado por PostgreSQL.
 */
export const uuidSchema = z.uuid({
  error: "El identificador no es válido.",
});

/**
 * Campo de búsqueda utilizado en listados.
 */
export const searchQuerySchema = z
  .string()
  .trim()
  .max(100, "La búsqueda no puede superar los 100 caracteres.")
  .optional();

/**
 * URL opcional.
 * Permite undefined o string vacío.
 */
export const optionalUrlSchema = z
  .union([
    z.url({
      error: "Ingresá una URL válida.",
    }),
    z.literal(""),
  ])
  .optional();

/**
 * Texto opcional.
 */
export const optionalStringSchema = (maxLength = 255) =>
  z
    .string()
    .trim()
    .max(maxLength, `El texto no puede superar los ${maxLength} caracteres.`)
    .optional();

/**
 * Texto obligatorio.
 */
export const requiredStringSchema = (minLength = 1, maxLength = 255) =>
  z
    .string()
    .trim()
    .min(minLength, "Este campo es obligatorio.")
    .max(maxLength, `El texto no puede superar los ${maxLength} caracteres.`);

/**
 * Precio.
 */
export const priceSchema = z.coerce
  .number({
    error: "Ingresá un precio válido.",
  })
  .positive("El precio debe ser mayor a 0.");

/**
 * Cantidad de stock.
 */
export const intSchema = z.coerce
  .number({
    error: "Ingresá una cantidad válida.",
  })
  .int("La cantidad debe ser un número entero.")
  .min(0, "La cantidad no puede ser negativa.");

/**
 * Boolean desde FormData.
 */
export const booleanSchema = z.coerce.boolean({
  error: "El valor debe ser verdadero o falso.",
});
