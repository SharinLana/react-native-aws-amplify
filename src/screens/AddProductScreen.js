import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";

import ImageUploader from "../components/ImageUploader";
import { useImagePicker } from "../../hooks/use-image-picker";

import { useCreateProduct } from "../../hooks/use-create-product";

const AddProductScreen = ({ navigation }) => {
  const { imageUri, pick } = useImagePicker();
  const { mutate: createProduct } = useCreateProduct();

  const {control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      price: 0.0,
      description: "",
    },
  });

  const onSubmit = async ({ name, price, description }) => {
    const newProduct = {
      name,
      price: Number(price),
      description,
      image: imageUri ? imageUri : "",
    };

    createProduct(newProduct);
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
            name="price"
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                label="Price"
                value={value.toString()}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        {/* Description */}
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
        <ImageUploader imageUri={imageUri} onPickImage={pick} />
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
