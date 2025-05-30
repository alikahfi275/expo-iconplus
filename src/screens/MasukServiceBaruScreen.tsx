import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "../api/api";
import { NoImage } from "../../assets/image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

const MasukServiceBaruScreen = (props: any) => {
  const [kodeBarang, setKodeBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [jumlahBarang, setJumlahBarang] = useState(0);
  const [kategoriBarang, setKategoriBarang] = useState("");
  const [gambar, setGambar] = useState(null);

  const addItems = async () => {
    console.log(gambar);

    try {
      await axios.post(`${BASE_URL}barang_service/create.php`, {
        kd_barang_service: kodeBarang,
        nm_barang: namaBarang,
        stok: jumlahBarang,
        kategori: kategoriBarang,
        gambar: gambar,
      });
      await axios.post(`${BASE_URL}barang_masuk_service/create.php`, {
        nm_barang: namaBarang,
        tanggal_masuk: new Date().toISOString().slice(0, 10),
        jumlah_masuk: jumlahBarang,
      });
      setGambar(null);
      setKodeBarang("");
      setNamaBarang("");
      setJumlahBarang(0);
      setKategoriBarang("");
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleIncrease = () => {
    setJumlahBarang((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (jumlahBarang > 0) {
      setJumlahBarang((prev) => prev - 1);
    }
  };

  const openPictures = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access gallery is required!");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      if (pickerResult.canceled) {
        return;
      }

      const imageUri: any = `data:image/jpeg;base64,${pickerResult.assets[0].base64}`;
      setGambar(imageUri);
    } catch (error) {
      console.log("Error picking image:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, backgroundColor: "#abdbe3" }}>
        <View style={{ backgroundColor: "#1e81b0" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 28,
              color: "black",
              fontWeight: "700",
              marginVertical: 5,
            }}
          >
            Barang Masuk Service Baru
          </Text>
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Kode Barang
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "black",
              paddingVertical: 5,
              marginBottom: 10,
            }}
            value={kodeBarang}
            onChangeText={(text) => setKodeBarang(text)}
            placeholder="Masukan Kode Barang"
          />
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Nama Barang
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "black",
              paddingVertical: 5,
              marginBottom: 10,
            }}
            value={namaBarang}
            onChangeText={(text) => setNamaBarang(text)}
            placeholder="Masukan Nama Barang"
          />
        </View>

        <View style={{ marginTop: 10, marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Jumlah Barang
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={handleDecrease}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 25,
                backgroundColor: "#1e81b0",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 18, color: "black", fontWeight: "600" }}>
                -
              </Text>
            </TouchableOpacity>

            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: "black",
                paddingVertical: 5,
                width: 100,
                textAlign: "center",
                fontSize: 16,
                fontWeight: "600",
              }}
              value={String(jumlahBarang)}
              keyboardType="numeric"
              onChangeText={(text) => setJumlahBarang(Number(text))}
            />

            <TouchableOpacity
              onPress={handleIncrease}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 25,
                backgroundColor: "#1e81b0",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 18, color: "black", fontWeight: "600" }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Kategori Barang
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "black",
              paddingVertical: 5,
              marginBottom: 10,
            }}
            value={kategoriBarang}
            onChangeText={(text) => setKategoriBarang(text)}
            placeholder="Masukan Kategori Barang"
          />
        </View>
        <Image
          source={gambar ? { uri: gambar } : NoImage}
          style={{ width: 100, height: 100, alignSelf: "center", marginTop: 5 }}
        />
        <TouchableOpacity
          onPress={openPictures}
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            backgroundColor: "#1e81b0",
            alignItems: "center",
            marginTop: 20,
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "black", fontWeight: "600" }}>
            UPLOAD GAMBAR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addItems}
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            backgroundColor: "#1e81b0",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "black", fontWeight: "600" }}>
            SIMPAN
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MasukServiceBaruScreen;
