import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icons from "../components/Icons";
import CModal from "../components/Modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  menuIcon,
  menuKeluar,
  menuMasuk,
  menuRetur,
  menuServis,
} from "../../assets/image";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      try {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ];

        for (const permission of permissions) {
          const granted = await PermissionsAndroid.check(permission);
          if (!granted) {
            const result = await PermissionsAndroid.request(permission);
            if (result !== PermissionsAndroid.RESULTS.GRANTED) {
              console.warn(`Permission ${permission} denied`);
            }
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      requestPermissions();
    }, 1000);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("role").then(setRole);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#abdbe3" }}>
      <StatusBar backgroundColor="#abdbe3" barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#1e81b0",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ marginHorizontal: 15 }} />
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              color: "black",
              fontWeight: "700",
              marginVertical: 5,
            }}
          >
            BERANDA UTAMA
          </Text>
          <Icons
            name={role === "superadmin" ? "account-plus" : "logout"}
            size={30}
            color="black"
            style={{ marginRight: 15 }}
            onPress={() => {
              role === "superadmin"
                ? navigation.navigate("TambahAkun")
                : setShowModal(true);
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 15,
            marginTop: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ListBarangMasuk")}
          >
            <Image
              source={menuMasuk}
              style={{ height: 140, width: 110 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => navigation.navigate("ListBarangKeluar")}
          >
            <Image
              source={menuKeluar}
              style={{ height: 140, width: 110 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ListBarangRetur")}
          >
            <Image
              source={menuRetur}
              style={{ height: 140, width: 110 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ marginHorizontal: 15, marginTop: 20 }}
          onPress={() => navigation.navigate("StokBarangIcon")}
        >
          <Image
            source={menuIcon}
            style={{ height: 200, width: "auto" }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginHorizontal: 15, marginTop: 20 }}
          onPress={() => navigation.navigate("StokBarangServis")}
        >
          <Image
            source={menuServis}
            style={{ height: 200, width: "auto" }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <CModal modalVisible={showModal} setModalVisible={setShowModal} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
