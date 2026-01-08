import { useState } from "react";

type Props = {
  onFilter: (params: { search: string; category: string }) => void;
  initCategory?: string;
  initSearch?: string;
};

export default function FilterComponent({ onFilter, initCategory = "", initSearch = "" }: Props) {
  const [search, setSearch] = useState(initSearch);
  const [category, setCategory] = useState(initCategory);

  return (
    <aside className="w-[250px] p-5 rounded-2xl shadow-xl bg-[#141414] h-fit hidden lg:block" onKeyDown={
      (e) => {
        if (e.key === 'Enter') {
          onFilter({ search, category });
        }
      }}>
      <h3 className="font-bold mb-4">Filters</h3>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search keyword"
        className="w-full mb-3 px-4 py-2 rounded-xl bg-black bg-opacity-20 outline-none"
      />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="w-full mb-4 px-4 py-2 rounded-xl bg-black bg-opacity-20 outline-none"
      />

      <button
        onClick={() => onFilter({ search, category })}
        className="w-full py-2 rounded-xl bg-white text-black font-bold hover:opacity-90 transition"
      >
        Filter
      </button>
    </aside>
  );
}
