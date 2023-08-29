import React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import ProductListComponent from "../components/ProductList";
import { useAllProducts } from "../../hooks/use-all-products";

const HomeScreen = () => {
  const { data } = useAllProducts();

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
