import { View, Text, StatusBar, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NoImage } from "../../assets/image";
import { BASE_URL } from "../api/api";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailBarangScreen = (props: any) => {
  const { kodeBarang } = props?.route?.params;
  const [detailItems, setDetailItems] = useState<any>({});

  const getDetailBarang = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}barang/gudang/detail.php?kode_barang=${kodeBarang}`
      );

      if (response.data.status === "success") {
        setDetailItems(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDetailBarang();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#abdbe3" barStyle="dark-content" />
      <View style={{ flex: 1, backgroundColor: "#abdbe3" }}>
        <View
          style={{
            backgroundColor: "#FEFDC5",
            alignItems: "center",
            borderWidth: 2,
            marginHorizontal: 40,
            marginTop: 25,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              marginVertical: 5,
            }}
          >
            KODE BARANG : {detailItems?.kode_barang}
          </Text>
        </View>
        <Image
          source={detailItems?.gambar ? { uri: detailItems?.gambar } : NoImage}
          style={{
            width: 200,
            height: 200,
            borderRadius: 10,
            marginTop: 20,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "black",
            marginVertical: 5,
            textAlign: "center",
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          {detailItems?.nama_barang}
        </Text>
        <View
          style={{
            backgroundColor: "#FEFDC5",
            alignItems: "center",
            borderWidth: 2,
            marginHorizontal: 60,
            marginTop: 25,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              marginVertical: 5,
            }}
          >
            STOK : {detailItems?.stok} / {detailItems?.satuan}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
            marginVertical: 5,
            textAlign: "center",
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          MEREK : {detailItems?.merek}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailBarangScreen;
