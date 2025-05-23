import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import ModalList from "../components/ModalList";
import Icons from "../components/Icons";
import axios from "axios";
import { NoImage } from "../../assets/image";
import { BASE_URL } from "../api/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

const CariBarangTokoScreen = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [gambar, setGambar] = useState(null);
  const [dataIcon, setDataIcon] = useState([]);
  const [pickItem, setPickItem] = useState<any>(null);
  const [kodeBarang, setKodeBarang] = useState("");
  const [stokBarang, setStokBarang] = useState("");
  const [merekBarang, setMerekBarang] = useState("");
  const [satuanBarang, setSatuanBarang] = useState("");
  const [kategoriBarang, setKategoriBarang] = useState("");

  const isService = props?.route?.params?.isService || false;
  const routeName = isService ? "service" : "icon";
  const cariBarang = () => {
    if (pickItem) {
      setKodeBarang(
        pickItem.kd_barang_icon
          ? pickItem.kd_barang_icon
          : pickItem.kd_barang_service
      );
      setStokBarang(pickItem.stok);
      setMerekBarang(pickItem.merek);
      setSatuanBarang(pickItem.satuan);
      setGambar(pickItem.gambar);
      setKategoriBarang(pickItem.kategori);
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

  useEffect(() => {
    getListBarang();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, backgroundColor: "#abdbe3" }}>
        <StatusBar backgroundColor="#abdbe3" barStyle="dark-content" />
        <ModalList
          title="Nama Barang"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          items={dataIcon}
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
          Cari Barang {isService ? "Service" : "Icon"}
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
                fontWeight: pickItem?.nm_barang ? "600" : "300",
                color: pickItem?.nm_barang ? "black" : "#4c4c4c",
              }}
            >
              {pickItem?.nm_barang ? pickItem?.nm_barang : "Nama Barang"}
            </Text>
            <Icons
              name="arrow-down-drop-circle"
              size={20}
              color="black"
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={cariBarang}
          style={{
            backgroundColor: "#2E7D32",
            padding: 12,
            marginVertical: 5,
            marginTop: 30,
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
            Cari Barang
          </Text>
        </TouchableOpacity>

        <Image
          source={gambar ? { uri: gambar } : NoImage}
          style={{
            width: 120,
            height: 120,
            alignSelf: "center",
            marginVertical: 10,
          }}
        />

        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "black",
            marginLeft: 20,
            textDecorationLine: "underline",
            marginVertical: 5,
          }}
        >
          Kode Barang
        </Text>
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: 20,
            paddingVertical: 5,
            borderWidth: 2,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: kodeBarang ? "600" : "300",
              color: kodeBarang ? "black" : "#4c4c4c",
              textAlign: "center",
            }}
          >
            {kodeBarang ? kodeBarang : "Kode Barang"}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "black",
            marginLeft: 20,
            textDecorationLine: "underline",
            marginVertical: 5,
          }}
        >
          Stok Barang
        </Text>
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: 20,
            paddingVertical: 5,
            borderWidth: 2,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: stokBarang ? "600" : "300",
              color: stokBarang ? "black" : "#4c4c4c",
              textAlign: "center",
            }}
          >
            {stokBarang ? stokBarang : "Stok Barang"}
          </Text>
        </View>

        {isService ? (
          <>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "black",
                marginLeft: 20,
                textDecorationLine: "underline",
                marginVertical: 5,
              }}
            >
              Kategori Barang
            </Text>
            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 20,
                paddingVertical: 5,
                borderWidth: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: kategoriBarang ? "600" : "300",
                  color: kategoriBarang ? "black" : "#4c4c4c",
                  textAlign: "center",
                }}
              >
                {kategoriBarang ? kategoriBarang : "Satuan Barang"}
              </Text>
            </View>
          </>
        ) : (
          <>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "black",
                marginLeft: 20,
                textDecorationLine: "underline",
                marginVertical: 5,
              }}
            >
              Merek Barang
            </Text>
            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 20,
                paddingVertical: 5,
                borderWidth: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: merekBarang ? "600" : "300",
                  color: merekBarang ? "black" : "#4c4c4c",
                  textAlign: "center",
                }}
              >
                {merekBarang ? merekBarang : "Merek Barang"}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "black",
                marginLeft: 20,
                textDecorationLine: "underline",
                marginVertical: 5,
              }}
            >
              Satuan Barang
            </Text>
            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 20,
                paddingVertical: 5,
                borderWidth: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: satuanBarang ? "600" : "300",
                  color: satuanBarang ? "black" : "#4c4c4c",
                  textAlign: "center",
                }}
              >
                {satuanBarang ? satuanBarang : "Satuan Barang"}
              </Text>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CariBarangTokoScreen;
