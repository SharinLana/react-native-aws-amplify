// ? 3 (view #4 in the src/screens/AppProductScreen.js)
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export function useImagePicker() {
  const [imageUri, setImageUri] = useState("");
  // This is how the collected data of the picked image should look like
  // file:///Users/sharinasvetlana/Library/Developer/CoreSimulator/Devices/D13A9A10-9CC3-4917-95DF-D8F990454E20/data/Containers/Data/Application/10047FDE-037B-4D64-9ED3-5D842DBDC680/Library/Caches/ExponentExperienceData/%2540anonymous%252Famplified_shop-83364c8d-a3c0-444e-af5a-68ec5cbc933a/ImagePicker/02C4E4C3-00EC-429B-BAD9-2F15F24C5497.jpg

  const pick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      result.assets.map((asset) => {
        setImageUri(asset.uri);
      });
    }
  };

  return { imageUri, pick };
}
