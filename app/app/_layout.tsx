import "../global.css";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as SystemUI from "expo-system-ui";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "~/providers/AuthProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#1e1e1e");

    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;
  const queryClient = new QueryClient();

  return (
    <ThemeProvider value={DarkTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack
            screenOptions={{
              contentStyle: { backgroundColor: "#1e1e1e" },
              animation: "none",
              gestureEnabled: true,
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: "#1e1e1e" },
              }}
            />

            <Stack.Screen
              name="camera-page"
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: "#1e1e1e" },
              }}
            />
            <Stack.Screen
              name="auth/login"
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: "#1e1e1e" },
              }}
            />
            <Stack.Screen
              name="food/search-food-page"
              options={{
                headerShown: true,
                contentStyle: { backgroundColor: "#1e1e1e" },
              }}
            />

            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
