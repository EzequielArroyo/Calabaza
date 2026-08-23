import { z } from "zod";

import {
  booleanSchema,
  optionalStringSchema,
  optionalUrlSchema,
  priceSchema,
  requiredStringSchema,
  intSchema,
  uuidSchema,
} from "@/modules/shared/validators";

export const createProductSchema = z.object({
  storeId: uuidSchema,

  categoryId: intSchema,

  name: requiredStringSchema(3, 200),

  description: optionalStringSchema(5000),

  price: priceSchema,

  stock: intSchema,

  imageUrl: optionalUrlSchema,

  active: booleanSchema.default(true),
});

export const updateProductSchema = createProductSchema.partial();
