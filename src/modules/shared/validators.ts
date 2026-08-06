import { z } from "zod";

/**
 * UUID generado por PostgreSQL
 */
export const uuidSchema = z.uuid();

/**
 * Campo de búsqueda utilizado en listados.
 */
export const searchQuerySchema = z.string().trim().max(100).optional();

/**
 * URL opcional.
 * Permite undefined o string vacío.
 */
export const optionalUrlSchema = z.union([z.url(), z.literal("")]).optional();

/**
 * Texto opcional.
 */
export const optionalStringSchema = (maxLength = 255) =>
  z.string().trim().max(maxLength).optional();

/**
 * Texto obligatorio.
 */
export const requiredStringSchema = (minLength = 1, maxLength = 255) =>
  z.string().trim().min(minLength).max(maxLength);

/**
 * Precio.
 */
export const priceSchema = z.coerce.number().positive();

/**
 * Cantidad de stock.
 */
export const stockSchema = z.coerce.number().int().min(0);

/**
 * Boolean desde FormData.
 */
export const booleanSchema = z.coerce.boolean();
