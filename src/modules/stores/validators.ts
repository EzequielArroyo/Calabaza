import { z } from "zod";

import {
  optionalStringSchema,
  requiredStringSchema,
} from "@/modules/shared/validators";

const coordinateSchema = (minimum: number, maximum: number) =>
  z
    .coerce
    .number({ error: "Ingresá una coordenada válida." })
    .finite("Ingresá una coordenada válida.")
    .min(minimum, "La coordenada está fuera del rango permitido.")
    .max(maximum, "La coordenada está fuera del rango permitido.");

export const createStoreSchema = z.object({
  name: requiredStringSchema(1, 150),
  description: optionalStringSchema(5000),
  phone: optionalStringSchema(30),
  address: requiredStringSchema(1, 500),
  latitude: coordinateSchema(-90, 90),
  longitude: coordinateSchema(-180, 180),
});
