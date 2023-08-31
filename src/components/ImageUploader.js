import React from "react";
import { View, Image, Button, StyleSheet } from "react-native";

const ImageUploader = ({ imageUri, onPickImage }) => {
  return (
    <View style={styles.imageView}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.photo} />}
      <Button
        style={styles.photoBtn}
        title="Choose Photo"
        onPress={onPickImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 15,
  },
  photo: {
    width: 200,
    height: 200,
  },
});

export default ImageUploader;
