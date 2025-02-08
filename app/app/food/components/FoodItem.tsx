// components/FoodItem.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Food } from "~/components/ui/Completed/SearchBar";
interface FoodItemProps {
  food: Food;
}

const FoodItem: React.FC<FoodItemProps> = ({ food }) => {
  return (
    <View style={styles.container}>
      {food.image && (
        <Image source={{ uri: food.image }} style={styles.image} />
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.description}>{food.description}</Text>
        <Text style={styles.calories}>{food.calories} kcal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
    padding: 8,
    alignItems: "center",
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: "#666",
  },
  calories: {
    marginTop: 4,
    color: "#333",
  },
});

export default FoodItem;
