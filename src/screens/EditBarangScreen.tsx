import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icons from "../components/Icons";
import ModalList from "../components/ModalList";
import axios from "axios";
import { NoImage } from "../../assets/image";
import { BASE_URL } from "../api/api";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

const EditBarangScreen = (props: any) => {
  const [kodeBarang, setKodeBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [stokBarang, setStokBarang] = useState("");
  const [merekBarang, setMerekBarang] = useState("");
  const [satuanBarang, setSatuanBarang] = useState("");
  const [gambar, setGambar] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [dataIcon, setDataIcon] = useState([]);
  const [pickItem, setPickItem] = useState<any>(null);
  const [kategoriBarang, setKategoriBarang] = useState("");

  const isService = props?.route?.params?.isService || false;
  const routeName = isService ? "service" : "icon";

  const uploadGambar = async () => {
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
  const getListBarang = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}barang_${routeName}/list.php`
      );
      if (response.data.status === "success") {
        setDataIcon(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const updateBarang = async () => {
    try {
      if (isService) {
        await axios.post(`${BASE_URL}barang_service/update.php`, {
          kd_barang_service: kodeBarang,
          nm_barang: namaBarang,
          stok: stokBarang,
          kategori: kategoriBarang,
          gambar: gambar,
        });
      } else {
        await axios.post(`${BASE_URL}barang_icon/update.php`, {
          kd_barang_icon: kodeBarang,
          nm_barang: namaBarang,
          stok: stokBarang,
          merek: merekBarang,
          satuan: satuanBarang,
          gambar: gambar,
        });
      }

      setPickItem(null);
      setKodeBarang("");
      setNamaBarang("");
      setStokBarang("");
      setMerekBarang("");
      setSatuanBarang("");
      setGambar(null);
      setKategoriBarang("");
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getListBarang();
  }, []);

  const handleSelect = (item: any) => {
    setPickItem(item);
    if (item.kd_barang_icon || item.kd_barang_service) {
      setKodeBarang(
        item?.kd_barang_icon ? item.kd_barang_icon : item.kd_barang_service
      );
      setNamaBarang(item?.nm_barang);
      setStokBarang(item?.stok);
      setMerekBarang(item?.merek || "");
      setSatuanBarang(item?.satuan || "");
      setGambar(item?.gambar);
      setKategoriBarang(item?.kategori || "");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: "#E6F1F7", flexGrow: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#abdbe3" }}>
        <ModalList
          title="Kode Barang"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          items={dataIcon}
          handleSelect={(item: any) => handleSelect(item)}
        />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
            marginBottom: 20,
            backgroundColor: "#1e81b0",
            paddingVertical: 10,
          }}
        >
          Edit Barang {isService ? "Service" : "Icon"}
        </Text>

        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginTop: 10,
              color: "black",
              textDecorationLine: "underline",
            }}
          >
            Kode Barang
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              justifyContent: "space-between",
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "black",
              }}
            >
              {pickItem?.kd_barang_icon
                ? pickItem?.kd_barang_icon
                : pickItem?.kd_barang_service
                ? pickItem?.kd_barang_service
                : "Kode Barang"}
            </Text>
            <Icons
              name="arrow-down-drop-circle"
              size={20}
              color="black"
              onPress={() => setModalVisible(true)}
            />
          </View>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "black",
              marginTop: 5,
            }}
          >
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
            onChangeText={setNamaBarang}
            placeholder="Masukan Nama Barang"
          />

          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Stok Barang
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "black",
              paddingVertical: 5,
              marginBottom: 10,
            }}
            value={stokBarang}
            keyboardType="numeric"
            onChangeText={setStokBarang}
            placeholder="Masukan Stok Barang"
          />

          {isService ? (
            <>
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
                onChangeText={setKategoriBarang}
                placeholder="Masukan Kategori Barang"
              />
            </>
          ) : (
            <>
              <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
                Merek Barang
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: "black",
                  paddingVertical: 5,
                  marginBottom: 10,
                }}
                value={merekBarang}
                onChangeText={setMerekBarang}
                placeholder="Masukan Merek Barang"
              />
              <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
                Satuan Barang
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: "black",
                  paddingVertical: 5,
                  marginBottom: 10,
                }}
                value={satuanBarang}
                onChangeText={setSatuanBarang}
                placeholder="Masukan Satuan Barang"
              />
            </>
          )}
          <Image
            source={gambar ? { uri: gambar } : NoImage}
            style={{
              width: 120,
              height: 120,
              alignSelf: "center",
              marginVertical: 10,
            }}
          />

          <TouchableOpacity
            onPress={uploadGambar}
            style={{
              backgroundColor: "#2E7D32",
              padding: 12,
              borderRadius: 5,
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              UPLOAD GAMBAR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={updateBarang}
            style={{
              backgroundColor: "#005A9C",
              padding: 12,
              borderRadius: 5,
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              UPDATE
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default EditBarangScreen;
