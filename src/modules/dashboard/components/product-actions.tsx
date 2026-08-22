'use client'
import ActionButton from "./action-button";
import { DeleteIcon, EditIcon } from "@/modules/shared/components/icons/icons";
import { deleteProduct } from "@/modules/dashboard/actions";

export default function ProductActions({ productId }: { productId: string }) {
  return (
    <div className="flex justify-end gap-2">
      <ActionButton>
        <EditIcon />
      </ActionButton>

      <ActionButton onClick={() => deleteProduct(productId)}>
        <DeleteIcon />
      </ActionButton>
    </div>
  );
}
