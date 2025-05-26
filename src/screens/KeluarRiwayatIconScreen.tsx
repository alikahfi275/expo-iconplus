import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Icons from "../components/Icons";
import axios from "axios";
import moment from "moment";
import { BASE_URL } from "../api/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

const KeluarRiwayatIconScreen = (props: any) => {
  const [dataRiwayatIcon, setDataRiwayatIcon] = useState([]);

  const getListRiwayatIcon = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}barang_keluar_icon/list.php`
      );
      if (response.data.status === "success") {
        setDataRiwayatIcon(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getListRiwayatIcon();
    }, [])
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#abdbe3" barStyle="dark-content" />
      <View style={{ flex: 1, backgroundColor: "#abdbe3" }}>
        <View style={{ backgroundColor: "#FE0000" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              color: "black",
              fontWeight: "700",
              marginVertical: 5,
            }}
          >
            Riwayat Barang Keluar Icon
          </Text>
        </View>

        <FlatList
          data={dataRiwayatIcon}
          renderItem={({ item }: any) => (
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
                Tanggal Keluar : {moment(item?.tanggal_keluar).format("L")}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  padding: 5,
                }}
              >
                Kode Barang Keluar : {item?.kd_barang_keluar}
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
                Jumlah Keluar : {item?.jumlah_keluar}
              </Text>
            </View>
          )}
        />
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("KeluarSearchRiwayat", {
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

export default KeluarRiwayatIconScreen;
