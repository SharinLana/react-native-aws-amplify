import { fetchCreateProduct, saveProductImage } from "../api/product-apis";
import { useMutation, useQueryClient } from "react-query";
import { useUser } from "./use-user";

export function useCreateProduct() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProductData) => {
      await fetchCreateProduct({ ...newProductData }, user.username, user.attributes.sub);
      // console.log("Data : \n")
      // console.log(newProductData);
      // console.log("DB Response in the hooks/use-create-product.js: \n");
      // console.log(createData);
      if (newProductData.image) {
        await saveProductImage(newProductData.image);
      }

      queryClient.setQueryData("all-products", (oldData) => {
        // console.log("Old data: \n");
        // console.log(oldData) // undefined
        return {
          data: {
            listProducts: {
              ...oldData.data.listProducts,
              items: [...oldData.data.listProducts.items, newProductData],
            },
          },
        };
      });
    },
  });
}
