import { useQuery, useMutation, useQueryClient } from "react-query";
import { addNewProductToDB } from "../api/products";

export const useAddProductToDB = () => {
  const queryClient = useQueryClient();

  return useMutation(addNewProductToDB, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries("super-heroes"); // use the key from the func that fetches all the heroes
      queryClient.setQueryData("all-products", (oldQueryData) => {
        return {
          ...oldQueryData, // the data from cache
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};
