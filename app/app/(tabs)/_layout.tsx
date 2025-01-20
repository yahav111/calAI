import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import {
  LayoutDashboard,
  Apple,
  Plus,
  DotSquare,
  Search,
} from "lucide-react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";

export default function TabLayout() {
  const colorScheme = "#1e1e1e";

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
            position: "absolute",
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
          title: "More",
          tabBarIcon: ({ color }) => (
            <Plus color={color} size={32} /> // Makes the icon larger
          ),
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
