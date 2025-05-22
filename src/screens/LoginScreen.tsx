import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const LoginScreen = () => {
  return (
    <SafeAreaView>
      <Ionicons name="checkmark-circle" size={32} color="green" />
    </SafeAreaView>
  );
};

export default LoginScreen;
