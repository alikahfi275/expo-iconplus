import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import ModalList from "../components/ModalList";
import Icons from "../components/Icons";
import axios from "axios";
import { BASE_URL } from "../api/api";
import { SafeAreaView } from "react-native-safe-area-context";

const HapusBarangTokoScreen = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dataGudang, setDataGudang] = useState([]);
  const [pickItem, setPickItem] = useState<any>(null);

  const isService = props?.route?.params?.isService || false;
  const routeName = isService ? "service" : "gudang";

  const deleteBarang = async () => {
    try {
      await axios.post(`${BASE_URL}barang/${routeName}/delete.php`, {
        kode_barang: pickItem?.kode_barang,
      });
      getListBarang();
      setPickItem(null);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const getListBarang = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}barang/${routeName}/list.php`
      );
      if (response.data.status === "success") {
        setDataGudang(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getListBarang();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, backgroundColor: "#abdbe3" }}>
        <StatusBar backgroundColor="#abdbe3" barStyle="dark-content" />
        <ModalList
          title="Kode Barang"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          items={dataGudang}
          handleSelect={(item: any) => setPickItem(item)}
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
          Hapus Barang {isService ? "Service" : "Icon"}
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
                fontWeight: pickItem?.kode_barang ? "600" : "300",
                color: pickItem?.kode_barang ? "black" : "#4c4c4c",
              }}
            >
              {pickItem?.kode_barang ? pickItem?.kode_barang : "0"}
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
          <Text
            style={{
              fontSize: 25,
              fontWeight: pickItem?.nama_barang ? "600" : "300",
              color: pickItem?.nama_barang ? "black" : "#4c4c4c",
              marginTop: 5,
              textAlign: "center",
            }}
          >
            {pickItem?.nama_barang ? pickItem?.nama_barang : "Nama Barang"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={deleteBarang}
          style={{
            backgroundColor: "#2E7D32",
            padding: 12,
            marginVertical: 5,
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            HAPUS
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HapusBarangTokoScreen;
