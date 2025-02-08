// /camera-page.tsx
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { Search, ScanBarcode } from "lucide-react-native";
import {
  Alert,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Plus } from "@/lib/icons/PlusIcon";
const SearchFoodPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setResults([]);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page_size=20`
      );
      const data = await response.json();

      if (data && data.products) {
        // Alert.alert("Results", JSON.stringify(data.products, null, 2));
        setResults(data.products);
      } else {
        setResults([]);
      }
    } catch (err) {
      setError("Error fetching results. Please try again.");
    }

    setLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
        backgroundColor: "#1A1A1A",
      }}
    >
      <View className="relative h-14">
        <TextInput
          className="bg-[#333333] text-right pr-11 pl-4 placeholder:text-white text-white h-full"
          autoFocus
          placeholder="חיפוש מהיר"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <View className="absolute right-4 h-full flex justify-center">
          <TouchableOpacity onPress={handleSearch}>
            <Search size={18} className="text-white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push("/camera-page");
          }}
          className="absolute left-4 h-full flex justify-center p-2"
        >
          <View>
            <ScanBarcode size={24} className="text-white" />
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-1 p-4">
        {loading && (
          <View className="items-center">
            <ActivityIndicator color="#fff" />
          </View>
        )}
        {error && (
          <Text className="text-red-500 text-center mb-4">{error}</Text>
        )}
        {!loading && results.length === 0 && query.trim() !== "" && !error && (
          <Text className="text-white text-center mt-4">No results found.</Text>
        )}
        <ScrollView className="mt-4 w-full">
          {results.map((product, index) => (
            <View
              key={product.id || index}
              className="bg-neutral-800 p-4 rounded-lg mb-4 flex flex-row-reverse justify-between w-full text-right gap-2 h-20"
            >
              <View className="flex flex-row-reverse  gap-2 w-4/5">
                {product.image_url ? (
                  <Image
                    source={{ uri: product.image_url }}
                    style={{ width: "20%", height: "auto", borderRadius: 8 }}
                    resizeMode="cover"
                  />
                ) : (
                  <View className="bg-neutral-900  w-[20%] rounded-lg justify-center items-center">
                    <Text className="text-white text-xs">No Image</Text>
                  </View>
                )}
                <View className="flex-1 text-right justify-center">
                  <Text className="text-white font-bold text-right">
                    {product.product_name || "No product name"}
                  </Text>

                  {product.nutriments && (
                    <Text className="text-gray-400 text-right">
                      {product.nutriments["energy-kcal_serving"]
                        ? product.nutriments["energy-kcal_serving"] +
                          " גרם מוצר"
                        : product.nutriments["energy-kcal_100g"]
                        ? "קל' " +
                          product.nutriments["energy-kcal_100g"] +
                          " גרם 100"
                        : "אין מידע קלורי"}
                    </Text>
                  )}
                </View>
              </View>
              <View className="h-full items-center justify-center">
                <View className="bg-neutral-900 p-2 rounded-full">
                  <Plus className="text-white" />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchFoodPage;
