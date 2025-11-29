"use client";

import { useState } from "react";
import { deleteCategory } from "@/actions/categories";
import { useRouter } from "next/navigation";

export default function DeleteCategoryButton({ id }: { id: string }) {
      const [loading, setLoading] = useState(false);
      const router = useRouter();

      const handleDelete = async () => {
            if (!confirm("Are you sure you want to delete this category?")) return;

            setLoading(true);
            try {
                  await deleteCategory(id);
                  router.refresh();
            } catch (error) {
                  alert("Failed to delete category");
            } finally {
                  setLoading(false);
            }
      };

      return (
            <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50"
            >
                  {loading ? "Deleting..." : "Delete"}
            </button>
      );
}
