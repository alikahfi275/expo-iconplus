import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./src/screens/LoginScreen";

import MasukIcon from "./src/screens/MasukIconScreen";
import MasukService from "./src/screens/MasukServiceScreen";
import MasukRiwayatIcon from "./src/screens/MasukRiwayatIconScreen";
import MasukRiwayatService from "./src/screens/MasukRiwayatServiceScreen";
import MasukIconBaru from "./src/screens/MasukIconBaruScreen";
import MasukSearchRiwayat from "./src/screens/MasukSearchRiwayatScreen";
import MasukServiceBaru from "./src/screens/MasukServiceBaruScreen";

import KeluarIcon from "./src/screens/KeluarIconScreen";
import KeluarService from "./src/screens/KeluarServiceScreen";
import KeluarRiwayatIcon from "./src/screens/KeluarRiwayatIconScreen";
import KeluarRiwayatService from "./src/screens/KeluarRiwayatServiceScreen";
import KeluarSearchRiwayat from "./src/screens/KeluarSearchRiwayatScreen";

import ReturIcon from "./src/screens/ReturIconScreen";
import ReturService from "./src/screens/ReturServiceScreen";
import ReturRiwayatIcon from "./src/screens/ReturRiwayatIconScreen";
import ReturRiwayatService from "./src/screens/ReturRiwayatServiceScreen";
import ReturSearchRiwayat from "./src/screens/ReturSearchRiwayatScreen";
import ReturEditRiwayat from "./src/screens/ReturEditRiwayatScreen";

import StokBarangIcon from "./src/screens/StokBarangIconScreen";
import StokBarangServis from "./src/screens/StokBarangServisScreen";
import DetailBarang from "./src/screens/DetailBarangScreen";
import EditBarang from "./src/screens/EditBarangScreen";
import HapusBarang from "./src/screens/HapusBarangScreen";
import CariBarang from "./src/screens/CariBarangScreen";
import ListBarangMasukScreen from "./src/screens/ListBarangMasukScreen";
import ListBarangKeluarScreen from "./src/screens/ListBarangKeluarScreen";
import ListBarangReturScreen from "./src/screens/ListBarangReturScreen";
import Home from "./src/screens/HomeScreen";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem("isLogin");
        setIsLogin(data);
      } catch (error) {
        console.error("Error fetching login state", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isLogin === "true" ? "Home" : "Login"}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="KeluarIcon" component={KeluarIcon} />
        <Stack.Screen name="MasukIcon" component={MasukIcon} />
        <Stack.Screen name="StokBarangIcon" component={StokBarangIcon} />
        <Stack.Screen name="StokBarangServis" component={StokBarangServis} />
        <Stack.Screen name="ReturIcon" component={ReturIcon} />
        <Stack.Screen name="DetailBarang" component={DetailBarang} />
        <Stack.Screen name="EditBarang" component={EditBarang} />
        <Stack.Screen name="HapusBarang" component={HapusBarang} />
        <Stack.Screen name="CariBarang" component={CariBarang} />
        <Stack.Screen name="MasukIconBaru" component={MasukIconBaru} />
        <Stack.Screen name="MasukServiceBaru" component={MasukServiceBaru} />
        <Stack.Screen name="MasukRiwayatIcon" component={MasukRiwayatIcon} />
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
        <Stack.Screen name="KeluarRiwayatIcon" component={KeluarRiwayatIcon} />
        <Stack.Screen
          name="KeluarRiwayatService"
          component={KeluarRiwayatService}
        />
        <Stack.Screen
          name="KeluarSearchRiwayat"
          component={KeluarSearchRiwayat}
        />
        <Stack.Screen name="ReturService" component={ReturService} />
        <Stack.Screen name="ReturRiwayatIcon" component={ReturRiwayatIcon} />
        <Stack.Screen
          name="ReturRiwayatService"
          component={ReturRiwayatService}
        />
        <Stack.Screen
          name="ReturSearchRiwayat"
          component={ReturSearchRiwayat}
        />
        <Stack.Screen name="ReturEditRiwayat" component={ReturEditRiwayat} />

        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
