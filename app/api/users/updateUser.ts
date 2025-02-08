import apiClient from "@/api/apiClient";
import { MutationResponse } from "@/types/api/auth";
import { UpdateUserPayload, User } from "@/types/api/user";
import axios from "axios";
export const updateUser = async (
  data: UpdateUserPayload
): Promise<MutationResponse<User>> => {
  try {
    const response = await apiClient.patch<User>("/users", data);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error updating user:", error);

    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status || 500,
        error:
          error.response?.data?.message || error.message || "Unknown error",
      };
    }

    return {
      status: 500,
      error: "An unexpected error occurred",
    };
  }
};
