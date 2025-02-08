import React, { ReactNode, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext"; // Ensure the correct path
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isUserLoading && !auth.user) {
      router.replace("/auth/login" as const);
    }
  }, [auth.isUserLoading, auth.user]);

  if (auth.isUserLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1e1e1e",
        }}
      >
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
