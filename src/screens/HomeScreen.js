import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import ProductListComponent from "../components/ProductList";
import { useFetchAllProducts } from "../../hooks/use-all-products";

const HomeScreen = () => {
  const { data } = useFetchAllProducts();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ProductListComponent data={data} />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
