"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addToCart } from "@/modules/cart/actions";

type AddToCartSectionProps = {
  productId: string;
  stock: number;
};

export function AddToCartSection({ productId, stock }: AddToCartSectionProps) {
  const maximumQuantity = Math.max(0, Math.min(stock, 10));
  const [quantity, setQuantity] = useState(1);

  function updateQuantity(nextQuantity: number) {
    setQuantity(Math.min(Math.max(nextQuantity, 1), maximumQuantity));
  }

  if (maximumQuantity === 0) {
    return <p className="font-semibold text-primary">Out of stock</p>;
  }

  return (
    <div className="flex flex-col gap-3 border-t border-primary/15 pt-5 sm:flex-row sm:items-end">
      <label className="flex w-fit flex-col gap-2 text-sm font-semibold text-secondary">
        Quantity
        <select
          value={quantity}
          onChange={(event) => updateQuantity(Number(event.target.value))}
          className="rounded-lg border border-primary/30 bg-white px-3 py-2 text-base text-secondary focus:border-primary focus:outline-none"
        >
          {Array.from({ length: maximumQuantity }, (_, index) => index + 1).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <Button
        variant="primary"
        onClick={() =>
          addToCart({
            productId,
            quantity,
          })}
      >
        Add to Cart
      </Button>
    </div>
  );
}
