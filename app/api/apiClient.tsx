import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.1.15:3100";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the Authorization token dynamically before each request
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const storedAccessToken = await AsyncStorage.getItem("access_token");

      if (storedAccessToken) {
        config.headers.Authorization = `${JSON.parse(storedAccessToken)}`;
      }
    } catch (error) {
      console.error("Failed to fetch accessToken:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
