import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../api/api";
import Icons from "../components/Icons";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ReturRiwayatServiceScreen = (props: any) => {
  const [dataRiwayatService, setDataRiwayatService] = useState<any>([]);
  const getListRiwayatService = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}barang_retur_service/list.php`
      );

      if (response.data.status === "success") {
        setDataRiwayatService(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getListRiwayatService();
    }, [])
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, backgroundColor: "#abdbe3" }}>
        <View style={{ backgroundColor: "#FFFFA3" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              color: "black",
              fontWeight: "700",
              marginVertical: 5,
            }}
          >
            Riwayat Barang Retur Service
          </Text>
        </View>

        <FlatList
          data={dataRiwayatService}
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
                Tanggal Retur : {moment(item?.tanggal).format("L")}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  padding: 5,
                }}
              >
                Kode Barang Retur : {item?.kd_barang_rt}
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
                Jumlah Retur : {item?.jumlah}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  padding: 5,
                }}
              >
                Supplier : {item?.supplier}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  padding: 5,
                }}
              >
                Nama Pelanggan : {item?.nm_pelanggan}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  padding: 5,
                }}
              >
                Tanggal Diantar : {item?.tanggal_diantar}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  padding: 5,
                }}
              >
                Catatan : {item?.catatan}
              </Text>
              <View style={{ backgroundColor: "#FFFFA3" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "black",
                    padding: 5,
                  }}
                >
                  Status : {item?.status}
                </Text>
              </View>
              <View style={{ backgroundColor: "#1e81b0" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "black",
                    padding: 5,
                  }}
                >
                  Tanggal Kembali : {item?.tanggal_kembali || "-"}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "black",
                    padding: 5,
                  }}
                >
                  Tanggal Diambil : {item?.tanggal_diambil || "-"}
                </Text>
              </View>
            </View>
          )}
        />

        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("ReturEditRiwayat", {
              isService: true,
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
          <Icons name="pencil" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("ReturSearchRiwayat", {
              isService: true,
            })
          }
          style={{
            position: "absolute",
            bottom: 20,
            right: 100,
            padding: 10,
            backgroundColor: "#FFFFA3",
            borderRadius: 50,
          }}
        >
          <Icons name="search" type="MaterialIcons" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReturRiwayatServiceScreen;
