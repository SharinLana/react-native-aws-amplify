import { useQuery } from "react-query";
import { fetchAllProducts } from "../api/products";

export function useAllProducts() {
  const { data, ...rest } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => fetchAllProducts(),
  });

  return { data: data?.data?.listProducts?.items, ...rest };
}

