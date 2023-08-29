import { API, graphqlOperation } from "aws-amplify";
import { createProduct } from "../src/graphql/mutations";
import { listProducts } from "../src/graphql/queries";

export const fetchAllProducts = async () => {
  return await API.graphql(graphqlOperation(listProducts));
};

export const addNewProductToDB = async (product) => {
  const newProduct = {
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image ? product.image : ""
  };
  const response = await API.graphql(
    graphqlOperation(createProduct, { input: newProduct })
  );

  console.log("Amplify response: "+ response)
  return response;
};
