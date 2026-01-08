import { useNavigate } from "react-router-dom";

type NavigateParams = {
  page?: number;
  search?: string;
  category?: string;
};

export function useNavigatePageOrSearch({
  page,
  search,
  category
}: NavigateParams) {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  if (page !== undefined) params.set("page", String(page));
  if (search !== undefined) params.set("search", search);
  if (category !== undefined) params.set("category", category);

  // defaults
  if (!params.get("page")) params.set("page", "1");

  navigate(`?${params.toString()}`);
}