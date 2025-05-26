import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icons from "../components/Icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../api/api";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { NoImage } from "../../assets/image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

const StokBarangScreen = () => {
  const navigation: any = useNavigation();
  const [showSpinner, setShowSpinner] = useState(false);
  const [dataIcon, setDataIcon] = useState([]);

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
        <View style={{ backgroundColor: "#BFFEC6" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 28,
              color: "black",
              fontWeight: "700",
              marginVertical: 5,
            }}
          >
            STOK BARANG ICON
          </Text>
        </View>
        <FlatList
          data={dataIcon}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailBarang", {
                  items: item,
                })
              }
              style={{
                backgroundColor: "white",
                marginHorizontal: 15,
                marginTop: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                borderWidth: 2,
              }}
            >
              <Image
                source={item?.gambar ? { uri: item?.gambar } : NoImage}
                style={{ height: 80, width: 80, margin: 10 }}
              />
              <View style={{ flex: 1, paddingVertical: 5 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "500", color: "black" }}
                >
                  {item.nm_barang}
                </Text>
              </View>

              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "800",
                    borderWidth: 2,
                    padding: 15,
                    color: "#1e81b0",
                  }}
                >
                  {item.stok}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("CariBarang")}
            style={{
              alignItems: "center",
              backgroundColor: "#BFFEC6",
              borderRadius: 50,
              padding: 10,
              marginRight: 15,
            }}
          >
            <Icons name="search" type="MaterialIcons" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("HapusBarang")}
            style={{
              alignItems: "center",
              backgroundColor: "#FE0000",
              borderRadius: 50,
              padding: 10,
              marginRight: 15,
            }}
          >
            <Icons name="trash" type="Entypo" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditBarang")}
            style={{
              alignItems: "center",
              backgroundColor: "#BFFEC6",
              borderRadius: 50,
              padding: 10,
            }}
          >
            <Icons name="pencil" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StokBarangScreen;
