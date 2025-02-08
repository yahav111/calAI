import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import CameraModal from "~/components/search/CameraModal";
export default function AddFood() {
  return (
    <ThemedView className="h-full text-white">
      <CameraModal />
    </ThemedView>
  );
}
