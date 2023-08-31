import React from "react";
import { Text, StyleSheet } from "react-native";
import { Card, Image } from "react-native-elements";

const ProductCard = ({
  productName,
  productDescription,
  productPrice,
  productImage,
}) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Title style={styles.cardTitle}>{productName}</Card.Title>

      {productImage && (
        <Image source={{ uri: productImage }} style={styles.productImage} />
      )}

      <Card.Divider style={styles.divider} />
      <Text>{productDescription}</Text>
      <Text style={styles.productPrice}>{productPrice}$</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 200,
    height: 200,
  },
  divider: {
    marginTop: 15,
  },
  productPrice: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  altView: {
    width: 200,
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 20,
  },
  productOwner: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  ownerTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
export default ProductCard;
