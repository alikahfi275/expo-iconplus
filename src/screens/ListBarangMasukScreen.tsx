import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ListBarangMasukScreen = (props: any) => {
  const navigation: any = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, backgroundColor: "#abdbe3" }}>
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
          BARANG MASUK
        </Text>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("MasukGudang")}
            style={{
              backgroundColor: "#BFFEC6",
              alignItems: "center",
              marginHorizontal: 60,
              marginTop: 80,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
                fontWeight: "600",
                maxWidth: 150,
                textAlign: "center",
                marginVertical: 20,
              }}
            >
              Barang Masuk Icon
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MasukService")}
            style={{
              backgroundColor: "#BFFEC6",
              alignItems: "center",
              marginHorizontal: 60,
              marginTop: 25,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
                fontWeight: "600",
                maxWidth: 190,
                textAlign: "center",
                marginVertical: 20,
              }}
            >
              Barang Masuk Service
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MasukRiwayatGudang")}
            style={{
              backgroundColor: "#1e81b0",
              alignItems: "center",
              marginHorizontal: 60,
              marginTop: 25,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
                fontWeight: "600",
                textAlign: "center",
                marginVertical: 20,
              }}
            >
              Riwayat Barang Masuk Icon
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MasukRiwayatService")}
            style={{
              backgroundColor: "#1e81b0",
              alignItems: "center",
              marginHorizontal: 60,
              marginTop: 25,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
                fontWeight: "600",
                textAlign: "center",
                marginVertical: 20,
              }}
            >
              Riwayat Barang Masuk Service
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ListBarangMasukScreen;
