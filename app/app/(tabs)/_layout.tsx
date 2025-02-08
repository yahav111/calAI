import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity, Text, View } from "react-native";
import { LayoutDashboard, Apple, DotSquare, Search } from "lucide-react-native";
import { HapticTab } from "@/components/HapticTab";
import { Plus } from "@/lib/icons/PlusIcon";
import TabBarBackground from "@/components/ui/TabBarBackground";
import CustomHeader from "~/components/CustomHeader";

export default function TabLayout() {
  const colorScheme = "#1e1e1e";
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        headerShown: false,

        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: colorScheme,
          },
          default: {
            backgroundColor: colorScheme,
            borderTopWidth: 0.5,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "בית",
          tabBarIcon: ({ color }) => <LayoutDashboard color={color} />,
        }}
      />
      <Tabs.Screen
        name="food-logs"
        options={{
          title: "אוכל",
          tabBarIcon: ({ color }) => <Apple color={color} />,
        }}
      />
      <Tabs.Screen
        name="add-food"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => null,
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => router.push("/add-food")}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderRadius: 50,
                  padding: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                }}
              >
                <Plus size={20} className="text-black" />
              </View>
            </TouchableOpacity>
          ),
          headerShown: true,
          header: () => <CustomHeader />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => <DotSquare color={color} />,
        }}
      />

      <Tabs.Screen
        name="test"
        options={{
          tabBarIcon: ({ color }) => <Search color={color} />,
        }}
      />
    </Tabs>
  );
}
