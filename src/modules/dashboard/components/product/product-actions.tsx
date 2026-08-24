'use client'
import ActionButton from "../action-button";
import { DeleteIcon, EditIcon } from "@/components/ui/icons";
import { deleteProduct } from "@/modules/dashboard/actions";
import Link from "next/link";

export default function ProductActions({ productId }: { productId: string }) {
  return (
    <div className="flex justify-end gap-2">
      <Link
        href={`/dashboard/products/edit/${productId}`}
        className="p-2 text-text hover:text-primary hover:bg-surface rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <EditIcon />
      </Link>

      <ActionButton onClick={() => deleteProduct(productId)}>
        <DeleteIcon />
      </ActionButton>
    </div>
  );
}
