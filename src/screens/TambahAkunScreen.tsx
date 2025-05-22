import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icons from "../components/Icons";
import CModal from "../components/Modal";

const TambahAkunScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSimpan = () => {
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Username dan Password tidak boleh kosong");
      return;
    }

    // Kirim ke API backend di sini (axios / fetch)
    Alert.alert("Berhasil", `Akun untuk ${username} berhasil disimpan`);
    setUsername("");
    setPassword("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#abdbe3" }}>
      <StatusBar backgroundColor="#abdbe3" barStyle="dark-content" />

      <View
        style={{
          backgroundColor: "#1e81b0",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ marginHorizontal: 15 }} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            color: "black",
            fontWeight: "700",
            marginVertical: 5,
          }}
        >
          TAMBAH AKUN
        </Text>
        <Icons
          name={"logout"}
          size={30}
          color="black"
          style={{ marginRight: 15 }}
          onPress={() => setShowModal(true)}
        />
        <CModal modalVisible={showModal} setModalVisible={setShowModal} />
      </View>

      {/* Form Tambah Akun */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Masukkan username"
          style={{
            borderWidth: 1,
            borderColor: "#1e81b0",
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            backgroundColor: "white",
          }}
        />

        <Text style={{ fontSize: 18, marginBottom: 10, marginTop: 20 }}>
          Password
        </Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Masukkan password"
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#1e81b0",
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            backgroundColor: "white",
          }}
        />

        <TouchableOpacity
          onPress={handleSimpan}
          style={{
            marginTop: 30,
            backgroundColor: "#1e81b0",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            SIMPAN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TambahAkunScreen;
