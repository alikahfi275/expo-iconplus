import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./src/screens/LoginScreen";

import MasukGudang from "./src/screens/MasukGudangScreen";
import MasukService from "./src/screens/MasukServiceScreen";
import MasukRiwayatGudang from "./src/screens/MasukRiwayatGudangScreen";
import MasukRiwayatService from "./src/screens/MasukRiwayatServiceScreen";
import MasukGudangBaru from "./src/screens/MasukGudangBaruScreen";
import MasukSearchRiwayat from "./src/screens/MasukSearchRiwayatScreen";
import MasukServiceBaru from "./src/screens/MasukServiceBaruScreen";

import KeluarGudang from "./src/screens/KeluarGudangScreen";
import KeluarService from "./src/screens/KeluarServiceScreen";
import KeluarRiwayatGudang from "./src/screens/KeluarRiwayatGudangScreen";
import KeluarRiwayatService from "./src/screens/KeluarRiwayatServiceScreen";
import KeluarSearchRiwayat from "./src/screens/KeluarSearchRiwayatScreen";

import ReturGudang from "./src/screens/ReturGudangScreen";
import ReturService from "./src/screens/ReturServiceScreen";
import ReturRiwayatGudang from "./src/screens/ReturRiwayatGudangScreen";
import ReturRiwayatService from "./src/screens/ReturRiwayatServiceScreen";
import ReturSearchRiwayat from "./src/screens/ReturSearchRiwayatScreen";
import ReturEditRiwayat from "./src/screens/ReturEditRiwayatScreen";

import StokBarangGudang from "./src/screens/StokBarangGudangScreen";
import StokBarangServis from "./src/screens/StokBarangServisScreen";
import DetailBarang from "./src/screens/DetailBarangScreen";
import EditBarang from "./src/screens/EditBarangScreen";
import HapusBarang from "./src/screens/HapusBarangScreen";
import CariBarang from "./src/screens/CariBarangScreen";
import ListBarangMasukScreen from "./src/screens/ListBarangMasukScreen";
import ListBarangKeluarScreen from "./src/screens/ListBarangKeluarScreen";
import ListBarangReturScreen from "./src/screens/ListBarangReturScreen";
import TambahAkun from "./src/screens/TambahAkunScreen";
import Home from "./src/screens/HomeScreen";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  async function getData(key: string) {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  }

  useEffect(() => {
    getData("isLogin").then((res) => {
      setIsLogin(res);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLogin ? "Home" : "Login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="KeluarGudang" component={KeluarGudang} />
        <Stack.Screen name="MasukGudang" component={MasukGudang} />
        <Stack.Screen name="StokBarangGudang" component={StokBarangGudang} />
        <Stack.Screen name="StokBarangServis" component={StokBarangServis} />
        <Stack.Screen name="ReturGudang" component={ReturGudang} />
        <Stack.Screen name="DetailBarang" component={DetailBarang} />
        <Stack.Screen name="EditBarang" component={EditBarang} />
        <Stack.Screen name="HapusBarang" component={HapusBarang} />
        <Stack.Screen name="CariBarang" component={CariBarang} />
        <Stack.Screen name="MasukGudangBaru" component={MasukGudangBaru} />
        <Stack.Screen name="MasukServiceBaru" component={MasukServiceBaru} />
        <Stack.Screen
          name="MasukRiwayatGudang"
          component={MasukRiwayatGudang}
        />
        <Stack.Screen name="MasukService" component={MasukService} />
        <Stack.Screen
          name="ListBarangMasuk"
          component={ListBarangMasukScreen}
        />
        <Stack.Screen
          name="ListBarangKeluar"
          component={ListBarangKeluarScreen}
        />
        <Stack.Screen
          name="ListBarangRetur"
          component={ListBarangReturScreen}
        />
        <Stack.Screen
          name="MasukRiwayatService"
          component={MasukRiwayatService}
        />
        <Stack.Screen
          name="MasukSearchRiwayat"
          component={MasukSearchRiwayat}
        />
        <Stack.Screen name="KeluarService" component={KeluarService} />
        <Stack.Screen
          name="KeluarRiwayatGudang"
          component={KeluarRiwayatGudang}
        />
        <Stack.Screen
          name="KeluarRiwayatService"
          component={KeluarRiwayatService}
        />
        <Stack.Screen
          name="KeluarSearchRiwayat"
          component={KeluarSearchRiwayat}
        />
        <Stack.Screen name="ReturService" component={ReturService} />
        <Stack.Screen
          name="ReturRiwayatGudang"
          component={ReturRiwayatGudang}
        />
        <Stack.Screen
          name="ReturRiwayatService"
          component={ReturRiwayatService}
        />
        <Stack.Screen
          name="ReturSearchRiwayat"
          component={ReturSearchRiwayat}
        />
        <Stack.Screen name="ReturEditRiwayat" component={ReturEditRiwayat} />
        <Stack.Screen name="TambahAkun" component={TambahAkun} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
