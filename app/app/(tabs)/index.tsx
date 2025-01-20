import { Image, StyleSheet, Platform } from "react-native";
import { TextInput, type TextInputProps } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { Card } from "~/components/ui/card";
import { Search, AArrowDown } from "lucide-react-native";
import CameraModal from "~/components/search/CameraModal";
export default function HomeScreen() {
  return (
    <ThemedView className="h-full text-white  dark">
      <Card className="h-[400px] bg-[#1e1e1e] w-screen px-4 text-right py-20 text-white">
        <Text className="font-bold text-white text-2xl">אוכל</Text>
      </Card>
      <Card className="absolute bottom-0 w-screen right-0 rounded-none bg-[#1e1e1e] border-none outline-none px-2 py-3">
        <View className="relative h-14">
          <TextInput
            className="bg-[#333333] rounded-[40px] text-right pr-10 pl-4 placeholder:text-white text-white h-full"
            placeholder="חיפוש מהיר"
          />
          <View className="absolute right-3 h-full flex justify-center">
            <Search size={24} className="text-white" />
          </View>
        </View>
      </Card>
    </ThemedView>
  );
}
