import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icons from "../components/Icons";
import axios from "axios";
import { BASE_URL } from "../api/api";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";

const MasukRiwayatIconScreen = (props: any) => {
  const [dataRiwayatIcon, setDataRiwayatIcon] = useState<any>([]);
  const getListRiwayatIcon = async () => {
    try {
      const response = await axios.get(`${BASE_URL}barang_masuk_icon/list.php`);

      if (response.data.status === "success") {
        setDataRiwayatIcon(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getListRiwayatIcon();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#1e81b0" barStyle="dark-content" />
      <View style={{ flex: 1, backgroundColor: "#abdbe3" }}>
        <View style={{ backgroundColor: "#1e81b0" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              color: "black",
              fontWeight: "700",
              marginVertical: 5,
            }}
          >
            Riwayat Barang Masuk Icon
          </Text>
        </View>

        <FlatList
          data={dataRiwayatIcon}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "white",
                borderWidth: 2,
                marginHorizontal: 20,

                marginTop: 25,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  alignItems: "center",
                  padding: 5,
                  backgroundColor: "#1e81b0",
                }}
              >
                Tanggal Masuk : {moment(item?.tanggal_masuk).format("L")}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  padding: 5,
                }}
              >
                Kode Barang : {item?.kd_barang_masuk}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  padding: 5,
                }}
              >
                Nama Barang : {item?.nm_barang}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  padding: 5,
                }}
              >
                Jumlah Masuk : {item?.jumlah_masuk}
              </Text>
            </View>
          )}
        />
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("MasukSearchRiwayat", {
              isIcon: true,
            })
          }
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            padding: 10,
            backgroundColor: "#BFFEC6",
            borderRadius: 50,
          }}
        >
          <Icons name="search" type="MaterialIcons" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MasukRiwayatIconScreen;
