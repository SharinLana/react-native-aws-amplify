import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { useAddProductToDB } from "../../hooks/use-create-product";
import ImageUploader from "../components/ImageUploader";
import { useImagePicker } from "../../hooks/use-image-picker";

const AddProductScreen = ({ navigation }) => {
  const { images, pick } = useImagePicker();
  const { mutate: addProduct } = useAddProductToDB();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      image: "",
    },
  });

  const onSubmit = async ({ name, price, description }) => {
    addProduct({ name, price, description });
  };

  return (
    <>
      <SafeAreaView style={styles.addProductView}>
        {/* Product name */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              minLength: 2,
              maxLength: 20,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Product title"
                placeholder="Add title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.inputField}
              />
            )}
            name="name"
          />
        </View>
        {errors.name?.type === "minLength" && (
          <Text style={styles.errorMessage}>
            Title cannot be shorter than 2 characters
          </Text>
        )}
        {errors.name?.type === "maxLength" && (
          <Text style={styles.errorMessage}>
            Title cannot be longer than 20 characters
          </Text>
        )}

        {/* Product price */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Price"
                placeholder="Add price"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.inputField}
              />
            )}
            name="price"
          />
        </View>

        {/* Description */}
        {/* Product price */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.inputField}
              />
            )}
            name="description"
          />
        </View>

        {/* Add image button */}
        <ImageUploader images={images} onPickImage={pick} />

        <Button
          title="Add"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitBtn}
        />
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  addProductView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 35,
  },
  container: {
    padding: 20,
  },
  inputContainer: {
    height: 80,
  },
  inputField: {
    fontSize: 16,
  },
  errorMessage: {
    marginBottom: 10,
  },
  submitBtn: {
    marginTop: 20,
  },
});
export default AddProductScreen;
