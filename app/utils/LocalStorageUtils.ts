import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLocalStorage = async (key: string, value: any) => {
  try {
    console.log(value);

    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to store data:", error);
  }
};

export const getAccessToken = async () => {
  try {
    const storedAccessToken = await AsyncStorage.getItem("access_token");
    return storedAccessToken ? JSON.parse(storedAccessToken) : null;
  } catch (error) {
    console.error("Failed to fetch accessToken:", error);
    return null;
  }
};
