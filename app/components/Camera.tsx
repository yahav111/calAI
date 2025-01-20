import React, { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleTakePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      if (!photo?.base64) return;
      if (onPictureTaken) onPictureTaken(photo.uri);
      console.log(photo.base64);

      try {
        const response = await fetch("http://localhost:3100/ai", {
          method: "POST",
          body: JSON.stringify(photo.base64),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Upload successful:", result);
        } else {
          console.error("Upload failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (onBarcodeScanned) {
      onBarcodeScanned(data);
    }
  };

  return (
    <CameraView
      style={[styles.camera, style]}
      ref={(ref) => setCameraRef(ref)}
      onBarcodeScanned={onBarcodeScanned ? handleBarCodeScanned : undefined}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
          <Text style={styles.text}>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </CameraView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
