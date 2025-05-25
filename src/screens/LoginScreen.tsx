import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SHA1 from "crypto-js/sha1";
import { TextInput } from "react-native-gesture-handler";
import Icons from "../components/Icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { BASE_URL } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [massage, setMassage] = useState("");
  const [showEye, setShowEye] = useState(false);
  const navigation: any = useNavigation();
  const [showSpinner, setShowSpinner] = useState(false);

  const hashedPassword = SHA1(password).toString();

  const handleLogin = async () => {
    setShowSpinner(true);
    try {
      const response = await axios.post(`${BASE_URL}user/login.php`, {
        username,
        password: hashedPassword,
      });
      if (response.data.status === "success") {
        navigation.navigate("Home");
        setMassage("");
        AsyncStorage.setItem("isLogin", "true");
        setShowSpinner(false);
      } else {
        setMassage("Username atau Password Salah");
        setShowSpinner(false);
      }
    } catch (error) {
      setMassage("Connection Error");
      setShowSpinner(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Spinner visible={showSpinner} textContent={"Loading..."} color="white" />
      <StatusBar backgroundColor="#abdbe3" barStyle="dark-content" />
      <View style={{ flex: 1, backgroundColor: "#abdbe3" }}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "white",
            borderWidth: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "700",
              color: "#4c4c4c",
            }}
          >
            PT. ICON PLUS
          </Text>
        </View>
        <View style={{ alignItems: "flex-start", marginLeft: 20 }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "700",
              marginTop: 120,
              color: "#1e81b0",
              textDecorationLine: "underline",
            }}
          >
            LOGIN
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            borderBottomWidth: 1,
            marginTop: 25,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Image source={User} style={{ width: 30, height: 30 }} />
          <TextInput
            style={{ fontSize: 18, flex: 1, color: "#4c4c4c" }}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            placeholderTextColor={"#b2b2b2"}
          />
        </View>
        <View
          style={{
            marginHorizontal: 20,
            borderBottomWidth: 1,
            marginTop: 25,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Icons
            name="key"
            color="black"
            size={25}
            style={{ marginRight: 5 }}
          />
          <TextInput
            style={{ fontSize: 18, flex: 1, color: "#4c4c4c" }}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={!showEye}
            placeholderTextColor={"#b2b2b2"}
          />
          <Icons
            onPress={() => setShowEye(!showEye)}
            name={showEye ? "eye" : "eye-with-line"}
            type="Entypo"
            color="#4c4c4c"
            size={25}
            style={{ marginRight: 5 }}
          />
        </View>
        {massage && (
          <Text
            style={{ textAlign: "center", marginTop: 10, color: "#d63a3a" }}
          >
            {massage}
          </Text>
        )}
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#1e81b0",
              marginHorizontal: 20,
              paddingHorizontal: 80,
              marginTop: 30,
              padding: 10,
            }}
            onPress={handleLogin}
          >
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
