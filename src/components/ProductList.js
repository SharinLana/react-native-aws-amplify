import React from "react";
import { SafeAreaView, StatusBar, Text, FlatList } from "react-native";
import ProductCard from "./ProductCard";

const ProductListComponent = ({ data }) => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {data && (
          <FlatList
            keyExtractor={(item) => item.id}
            data={data}
            renderItem={({ item }) => {
           
              return (
                <ProductCard
                  productName={item.name}
                  productPrice={item.price}
                  productDescription={item.description}
                  productImage={item.image}
                />
              );
            }}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default ProductListComponent;
