import React, { useState } from "react";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraCapturedPicture,
} from "expo-camera";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ChevronRight } from "@/lib/icons/ArrowIcon";
import { Settings } from "@/lib/icons/SettingsIcon";
import { ScanBarcode } from "@/lib/icons/BarcodeIcon";
import { Button } from "../ui/button";
import { Upload } from "@/lib/icons/UploadIcon";
import { Camera } from "@/lib/icons/CameraIcon";
import { useNavigation } from "@react-navigation/native";
interface CustomCameraProps {
  onBarcodeScanned?: (data: string) => void;
  onPictureTaken?: (data: CameraCapturedPicture) => void;
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
  const navigation = useNavigation();
  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to use the camera.
        </Text>
      </View>
    );
  }

  const toggleCameraFacing = () =>
    setFacing((current) => (current === "back" ? "front" : "back"));

  const handleTakePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ base64: true });
      if (!photo?.base64) return;
      onPictureTaken?.(photo);
    }
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    try {
      onBarcodeScanned?.(data);
    } catch (error) {
      console.error("Error scanning barcode:", error);
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
          <View style={styles.cameraHeaders}>
            <View
              style={[
                styles.cameraHeaderChild,
                { flex: 1, justifyContent: "flex-start" },
              ]}
            >
              <TouchableOpacity
                className="bg-[#1e1e1e] p-2 rounded-lg border border-neutral-600"
                onPress={handleGoBack}
              >
                <ChevronRight size={20} className="text-white rotate-180" />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.cameraHeaderChild,
                { flex: 1, justifyContent: "center" },
              ]}
            ></View>
            <View
              style={[
                styles.cameraHeaderChild,
                { flex: 1, justifyContent: "flex-end" },
              ]}
            >
              <TouchableOpacity
                className="bg-[#1e1e1e] p-2 rounded-lg border border-neutral-600"
                onPress={toggleCameraFacing}
              >
                <Settings size={20} className="text-white rotate-180" />
              </TouchableOpacity>
            </View>
          </View>
          {mode === "scan" && (
            <View style={styles.scannerOverlay}>
              <View style={styles.middleSection}>
                <View style={styles.sideOverlay} />
                <View style={styles.scanArea}></View>
                <View style={styles.sideOverlay} />
              </View>
            </View>
          )}
          <View className="h-1/6 flex flex-row items-end justify-between px-4">
            {/* Left Button - Upload */}
            <Button
              size="icon"
              className="bg-[#1e1e1e] h-20 w-20 flex items-center justify-center p-2 rounded-3xl border border-neutral-800 mb-4 shadow-lg"
            >
              <Upload size={25} className="text-white" />
            </Button>

            {/* Center Button - Scan (conditionally disabled) */}
            <Button
              disabled={mode === "scan"}
              onPress={handleTakePicture}
              size="icon"
              className={`bg-white h-24 w-24 flex items-center justify-center p-2 rounded-3xl border border-neutral-800 mb-10 shadow-lg ${
                mode === "scan" ? "ring-2 ring-offset-2 ring-[#1e1e1e]" : ""
              }`}
            >
              {mode === "scan" ? (
                <ScanBarcode size={25} className="text-[#1e1e1e]" />
              ) : (
                <Camera size={25} className="text-[#1e1e1e] rotate-180" />
              )}
            </Button>

            {/* Right Button - Toggle between Camera and Barcode */}
            <Button
              onPress={() => setMode(mode === "scan" ? "photo" : "scan")}
              size="icon"
              className="bg-[#1e1e1e] h-20 w-20 flex items-center justify-center p-2 rounded-3xl border border-neutral-800 mb-4 shadow-lg"
            >
              {mode === "scan" ? (
                <Camera size={25} className="text-white" />
              ) : (
                <ScanBarcode size={25} className="text-white" />
              )}
            </Button>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  scannerOverlay: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
  },
  overlayPart: {
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  middleSection: {
    flexDirection: "row",
    width: "100%",
    height: 250,
    alignItems: "center",
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  scanArea: {
    width: "100%",
    height: 150,
    maxWidth: 400,
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  scanLine: {
    position: "absolute",
    width: "100%",
    height: 3,
    backgroundColor: "#00FF00",
    top: 0,
  },
  shadowCorners: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#00FF00",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
  },

  camera: {
    flex: 1,
    height: "100%",
    position: "relative",
  },
  cameraHeaders: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  cameraHeaderChild: {
    flexDirection: "row",
    gap: 10,
    width: "33.33%",
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
    padding: 30,
  },
  controls: {
    height: "20%",
    flexDirection: "column",
    gap: 10,
    justifyContent: "flex-end",
    paddingTop: 20,
  },
  controlButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "100%",
    padding: 7.5,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 16,
    color: "#fff",
  },
  captureButtonOuter: {
    position: "absolute",
    backgroundColor: "transparent",
    borderRadius: "100%",
    width: 100,
    height: 100,
    padding: 2.5,
    top: "0%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -20 }],
    flex: 1,
    borderColor: "white",
    borderWidth: 2,
  },
  captureButton: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderRadius: "100%",
  },
});

export default CustomCamera;
