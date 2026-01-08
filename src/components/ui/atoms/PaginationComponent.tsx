import type { ProductsResponse } from "../../../api/products";

type Props = {
  pagination: ProductsResponse["pagination"];
  onPageChange: (page: number) => void;
};

export default function PaginationComponent({ pagination, onPageChange }: Props) {
  const { page, totalPages, hasNext, hasPrev } = pagination;

  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      <button
        disabled={!hasPrev}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 rounded-xl bg-white text-black bg-opacity-10 disabled:opacity-30"
      >
        {'<'}
      </button>

      <span className="text-sm opacity-70">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 rounded-xl bg-white text-black bg-opacity-10 disabled:opacity-30"
      >
        {'>'}
      </button>
    </div>
  );
}
