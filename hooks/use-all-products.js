import { useQuery } from "react-query";
import { fetchAllProducts } from "../api/product-apis";

export function useFetchAllProducts() {
  const {data} =  useQuery({
    queryKey: "all-products",
    queryFn: () => fetchAllProducts(),
  });

  return { data: data?.data.listProducts?.items };
}

