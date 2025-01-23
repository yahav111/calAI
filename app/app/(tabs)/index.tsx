import { TextInput, type TextInputProps } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { Card } from "~/components/ui/card";
import { Search } from "@/lib/icons/SearchIcon";
import { ScanBarcode } from "@/lib/icons/BarcodeIcon";

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
            className="bg-[#333333] rounded-[40px] text-right pr-11 pl-4 placeholder:text-white text-white h-full"
            placeholder="חיפוש מהיר"
          />
          <View className="absolute right-4 h-full flex justify-center">
            <Search size={18} className="text-white" />
          </View>
          <View className="absolute left-4 h-full flex justify-center">
            <ScanBarcode size={24} className="text-white" />
          </View>
        </View>
      </Card>
    </ThemedView>
  );
}
