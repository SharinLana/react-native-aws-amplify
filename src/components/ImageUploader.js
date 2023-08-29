import React from "react";
import { View, Image, Button, StyleSheet } from "react-native";

const ImageUploader = ({ images, onPickImage }) => {
  return (
    <View style={styles.imageView}>
      {images.length > 0 && (
        <Image source={{ uri: images[0] }} style={styles.photo} />
      )}
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
