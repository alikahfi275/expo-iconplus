import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import ModalList from "../components/ModalList";
import Icons from "../components/Icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { BASE_URL } from "../api/api";
import { SafeAreaView } from "react-native-safe-area-context";

const MasukIconScreen = (props: any) => {
  const navigation: any = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [itemPick, setItemPick] = useState<any>({});
  const [jumlah, setJumlah] = useState(0);

  const [dataIcon, setDataIcon] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  const updateJumlah = async () => {
    try {
      await axios.post(`${BASE_URL}barang_icon/update.php`, {
        kd_barang_icon: itemPick.kd_barang_icon,
        stok: jumlah,
      });
      await axios.post(`${BASE_URL}barang_masuk_icon/create.php`, {
        nm_barang: itemPick.nm_barang,
        tanggal_masuk: new Date().toISOString().slice(0, 10),
        jumlah_masuk: jumlah - itemPick.stok,
      });
      setJumlah(0);
      setItemPick({});
      getListBarangIcon();
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleIncrease = () => {
    setJumlah((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (jumlah > 0) {
      setJumlah((prev) => prev - 1);
    }
  };

  const getListBarangIcon = async () => {
    setShowSpinner(true);
    try {
      const response = await axios.get(`${BASE_URL}barang_icon/list.php`);
      if (response.data.status === "success") {
        setDataIcon(response.data.data);
        setShowSpinner(false);
      } else {
        setShowSpinner(false);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      setShowSpinner(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getListBarangIcon();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Spinner visible={showSpinner} textContent={"Loading..."} color="white" />

      <View style={{ flex: 1, backgroundColor: "#abdbe3" }}>
        <ModalList
          title="Nama Barang"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          items={dataIcon}
          handleSelect={(item: any) => {
            setItemPick(item);
            setModalVisible(false);
            setJumlah(Number(item.stok));
          }}
        />
        <View style={{ backgroundColor: "#1e81b0" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              color: "black",
              fontWeight: "700",
              marginVertical: 5,
            }}
          >
            Barang Masuk Icon
          </Text>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginTop: 20,
              color: "black",
              textDecorationLine: "underline",
            }}
          >
            Nama Barang
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
                fontWeight: itemPick.nm_barang ? "600" : "300",
                color: itemPick.nm_barang ? "black" : "#4c4c4c",
              }}
            >
              {itemPick.nm_barang ? itemPick.nm_barang : "Nama Barang"}
            </Text>
            <Icons
              name="arrow-down-drop-circle"
              size={20}
              color="black"
              onPress={() => setModalVisible(true)}
            />
          </View>
          <View style={{ marginTop: 10 }}>
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
                <Text
                  style={{ fontSize: 18, color: "black", fontWeight: "600" }}
                >
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
                value={String(jumlah)}
                keyboardType="numeric"
                onChangeText={(text) => setJumlah(Number(text))}
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
                <Text
                  style={{ fontSize: 18, color: "black", fontWeight: "600" }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={updateJumlah}
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            backgroundColor: "#1e81b0",
            alignItems: "center",
            paddingVertical: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 16, color: "black", fontWeight: "600" }}>
            SIMPAN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("MasukIconBaru")}
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            backgroundColor: "#1e81b0",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "black", fontWeight: "600" }}>
            BARANG MASUK ICON BARU
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MasukIconScreen;
