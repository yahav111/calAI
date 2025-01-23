import React, { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { uploadImageFromUri } from "@/lib/supabase";

interface CustomCameraProps {
  onBarcodeScanned?: (data: string) => void;
  onPictureTaken?: (photoUri: string) => void;
  style?: object;
}

export const CustomCamera: React.FC<CustomCameraProps> = ({
  onBarcodeScanned,
  onPictureTaken,
  style,
}) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
  const [mode, setMode] = useState<"scan" | "photo">("photo");
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to use the camera.
        </Text>
        {/* <TouchableOpacity style={styles} onPress={requestPermission}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleTakePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ base64: true });
      if (!photo?.base64) return;

      try {
        const supa = await uploadImageFromUri(photo.uri, "Images", "test.jpg");
        const response = await fetch("http://10.0.0.2:3100/ai", {
          method: "POST",
          body: JSON.stringify({ path: "test.jpg" }),
          headers: { "Content-Type": "application/json" },
        });
        const json = await response.json();
        //@ts-ignore
        onPictureTaken?.(json.data.foodItems[0].name);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  };

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    try {
      // Fetch food details using Open Food Facts API
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );
      const json = await response.json();

      if (json.status === 1) {
        // Valid product found
        const foodDetails = {
          name: json.product.product_name,
          brand: json.product.brands,
          calories: json.product.nutriments["energy-kcal_100g"],
          protein: json.product.nutriments["proteins_100g"],
          fat: json.product.nutriments["fat_100g"],
          carbs: json.product.nutriments["carbohydrates_100g"],
        };
        onBarcodeScanned?.(foodDetails);
        Alert.alert("Food Details", JSON.stringify(foodDetails, null, 2));
      } else {
        // Invalid barcode
        Alert.alert("Error", "Food product not found for this barcode.");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      Alert.alert("Error", "Failed to fetch product details.");
    } finally {
      setTimeout(() => setScanned(false), 2000); // Reset scanning cooldown
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={[styles.camera, style]}
        ref={(ref) => setCameraRef(ref)}
        facing={facing}
        onBarcodeScanned={
          mode === "scan" && !scanned ? handleBarCodeScanned : undefined
        }
      >
        <View style={styles.overlay}>
          <View style={styles.modeSelector}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                mode === "photo" && styles.activeModeButton,
              ]}
              onPress={() => setMode("photo")}
            >
              <Text style={styles.modeText}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modeButton,
                mode === "scan" && styles.activeModeButton,
              ]}
              onPress={() => setMode("scan")}
            >
              <Text style={styles.modeText}>Scan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.controlText}>Flip</Text>
            </TouchableOpacity>
            {mode === "photo" && (
              <TouchableOpacity
                style={styles.controlButton}
                onPress={handleTakePicture}
              >
                <Text style={styles.controlText}>Capture</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  modeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  modeButton: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  activeModeButton: {
    backgroundColor: "rgba(0, 122, 255, 0.7)",
  },
  modeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  controlButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    padding: 15,
  },
  controlText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 16,
    color: "#fff",
  },
});
