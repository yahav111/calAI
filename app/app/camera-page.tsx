// /camera-page.tsx
import { CameraCapturedPicture } from "expo-camera";
import React from "react";
import { View, Alert } from "react-native";
import { CustomCamera } from "~/components/Camera/Camera";
import { uploadImageFromUri } from "~/lib/supabase";

const CameraPage = () => {
  const onBarcodeScanned = async (data: string) => {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${data}.json`
    );
    const json = await response.json();

    if (json.status === 1) {
      const foodDetails = {
        name: json.product.product_name,
        brand: json.product.brands,
        calories: json.product.nutriments["energy-kcal_100g"],
        protein: json.product.nutriments["proteins_100g"],
        fat: json.product.nutriments["fat_100g"],
        carbs: json.product.nutriments["carbohydrates_100g"],
      };
      Alert.alert("Food Details", JSON.stringify(foodDetails, null, 2));
    } else {
      // Invalid barcode
      Alert.alert("Error", "Food product not found for this barcode.");
    }
  };
  const onPictureTaken = async (photo: CameraCapturedPicture) => {
    try {
      const supa = await uploadImageFromUri(photo.uri, "Images", "test.jpg");
      const response = await fetch("http://192.168.1.15:3100/ai", {
        method: "POST",
        body: JSON.stringify({ path: "test.jpg" }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      Alert.alert("Response", JSON.stringify(json, null, 2));
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <CustomCamera
        onPictureTaken={onPictureTaken}
        onBarcodeScanned={onBarcodeScanned}
      />
    </View>
  );
};

export default CameraPage;
