// components/CustomHeader.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight } from "@/lib/icons/ArrowIcon";
const CustomHeader: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/"); // Navigate to the index page
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <ChevronRight
          color={"white"}
          style={{ transform: [{ rotate: "180deg" }] }}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>Custom Header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
    height: 100,
    width: "100%",
  },
  backButton: {
    marginRight: 20,
  },
  backText: {
    color: "white",
    fontSize: 18,
  },
  headerText: {
    color: "white",
    fontSize: 18,
  },
});

export default CustomHeader;
