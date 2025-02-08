import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/api/apiClient";
import { User } from "@/types/api/user";
import {
  LoginCredentials,
  LoginResponse,
  MutationResponse,
} from "@/types/api/auth";
import { fetchUser } from "@/api/users/fetchUser";
import { login } from "@/api/auth";
import { Alert } from "react-native";
import { setLocalStorage } from "~/utils/LocalStorageUtils";

export function useAuth() {
  const queryClient = useQueryClient();

  // User query
  const userQuery = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
  });

  // Login mutation
  const loginMutation = useMutation<MutationResponse, Error, LoginCredentials>({
    mutationFn: login,
    onSuccess: (data) => {
      const response = data.data as LoginResponse;

      setLocalStorage("access_token", response.accessToken);
      queryClient.setQueryData(["user"], response.user);
      return response;
    },
  });

  // Logout mutation
  const logout = useMutation<void, Error>({
    mutationFn: () => apiClient.post("/auth/logout"),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
    },
  });

  return {
    user: userQuery.data || null,
    isAuthenticated: !!userQuery.data,
    isUserLoading: userQuery.isLoading,
    isLoginLoading: loginMutation.status === "pending",
    login: loginMutation.mutateAsync,
    logout: logout.mutateAsync,
  };
}
