import { API, graphqlOperation, Storage } from "aws-amplify";
import { createProduct } from "../src/graphql/mutations";
import { listProducts } from "../src/graphql/queries";

export function fetchCreateProduct(product, userName, userId) {
  const newProduct = {
    name: product.name,
    price: product.price,
    description: product.description,
    userId: userId,
    userName: userName,
    image: product.image ? product.image : "",
  };

  return API.graphql(graphqlOperation(createProduct, { input: newProduct }));
}

export async function saveProductImage(uri) {
  const imageResponse = await fetch(uri);
  const blob = await imageResponse.blob();

  await Storage.put(uri, blob, {
    contentType: "image/jpeg",
  });
}

export async function fetchAllProducts() {
  return await API.graphql(graphqlOperation(listProducts));
}
