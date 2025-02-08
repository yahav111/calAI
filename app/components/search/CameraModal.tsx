import React, { useState } from "react";
import { StyleSheet, View, Button, Modal, Alert } from "react-native";
import { CustomCamera } from "~/components/Camera/Camera";

export default function CameraModal() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  const handlePictureTaken = (photoUri: string) => {
    setIsCameraOpen(false);
    Alert.alert("Picture Taken", `Photo saved at: ${photoUri}`);
  };

  return (
    <View className="w-screen h-[400px] bg-[#1e1e1e] p-10">
      <Button title="Open Camera" onPress={handleOpenCamera} />
      <Modal visible={isCameraOpen} animationType="slide">
        <CustomCamera onPictureTaken={handlePictureTaken} />
        <Button title="Close Camera" onPress={handleCloseCamera} />
      </Modal>
    </View>
  );
}
