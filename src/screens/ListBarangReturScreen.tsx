import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ListBarangReturScreen = (props: any) => {
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
            backgroundColor: "#FFFFA3",
            paddingVertical: 10,
          }}
        >
          BARANG RETUR
        </Text>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ReturGudang")}
            style={{
              backgroundColor: "#FFFFA3",
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
              Barang Retur Icon
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ReturService")}
            style={{
              backgroundColor: "#FFFFA3",
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
              {"Barang Retur \n Service"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ReturRiwayatGudang")}
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
              {"Riwayat Barang \n Retur Icon"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ReturRiwayatService")}
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
              {"Riwayat Barang \n Retur Service"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ListBarangReturScreen;
