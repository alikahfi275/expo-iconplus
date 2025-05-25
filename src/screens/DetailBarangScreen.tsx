import { View, Text, StatusBar } from "react-native";
import React from "react";
import { NoImage } from "../../assets/image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

const DetailBarangScreen = (props: any) => {
  const { items } = props?.route?.params;

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
            KODE BARANG : {items?.kd_barang_icon}
          </Text>
        </View>
        <Image
          source={items?.gambar ? { uri: items?.gambar } : NoImage}
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
          {items?.nm_barang}
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
            STOK : {items?.stok} {items?.satuan ? `/${items?.satuan}` : ""}
          </Text>
        </View>
        {items?.merek && (
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
            MEREK : {items?.merek}
          </Text>
        )}
        {items?.kategori && (
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
            Kategori : {items?.kategori}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DetailBarangScreen;
