'use client'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DeleteIcon, PlusIcon, MinusIcon } from "@/components/ui/icons";
import {
  removeCartItem,
  incrementCartItem,
  decrementCartItem,
} from "@/modules/cart/actions";

export default function CartItemActions({itemId, itemQuantity} : { itemId: string, itemQuantity: number}){
      const router = useRouter();

      async function handleIncrement() {
        await incrementCartItem(itemId);
        router.refresh();
      }

      async function handleDecrement() {
        await decrementCartItem(itemId);
        router.refresh();
      }

      async function handleRemove() {
        await removeCartItem(itemId);
        router.refresh();
      }
    return (
      <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
        <div className="flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 p-1">
          <Button onClick={handleDecrement}>
            <MinusIcon />
          </Button>

          <span className="w-5 text-center font-semibold text-secondary">
            {itemQuantity}
          </span>

          <Button onClick={handleIncrement}>
            <PlusIcon />
          </Button>
        </div>

        <Button onClick={handleRemove}>
          <DeleteIcon />
        </Button>
      </div>
    );
}