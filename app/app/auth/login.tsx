import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ActivityIndicator } from "react-native";
import { useContext } from "react";
import { AuthContext } from "~/contexts/AuthContext";

// Form Validation Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginFormInputs = z.infer<typeof loginSchema>;
export default function LoginScreen() {
  const { login, isLoginLoading } = useContext(AuthContext);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await login(data);
      console.log("Mutation Response:", response);

      Alert.alert("response", JSON.stringify(response, null, 2));

      if (response && response.status === 202 && response.data) {
        router.replace("/");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#1e1e1e] px-6">
      <Text className="text-2xl font-semibold text-white mb-6">
        כניסה למשתמש
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <View className="w-full mb-4">
            <Input
              className="text-white bg-[#333333] text-right"
              placeholder="מייל"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email && (
              <Text className="text-red-500 mt-1">
                {String(errors.email.message)}
              </Text>
            )}
          </View>
        )}
      />

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View className="w-full mb-4">
            <Input
              className="text-white bg-[#333333] text-right"
              placeholder="סיסמה"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
            {errors.password && (
              <Text className="text-red-500 mt-1">
                {String(errors.password.message)}
              </Text>
            )}
          </View>
        )}
      />

      {/* Login Button */}
      <Button
        className="w-full bg-white text-black font-semibold"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoginLoading}
      >
        {isLoginLoading ? (
          <ActivityIndicator color="black" />
        ) : (
          <Text className="font-bold">התחברות</Text>
        )}
      </Button>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => router.push("/")} className="mt-4">
        <Text className="text-gray-400">
          אין לך חשבון? <Text className="text-blue-400">הירשם</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
