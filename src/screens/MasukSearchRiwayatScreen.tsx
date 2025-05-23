import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icons from "../components/Icons";
import ModalList from "../components/ModalList";
import axios from "axios";
import { BASE_URL } from "../api/api";
import moment from "moment";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { SafeAreaView } from "react-native-safe-area-context";

const MasukSearchRiwayatScreen = (props: any) => {
  const isIcon = props?.route?.params?.isIcon || false;

  const [modalVisible, setModalVisible] = useState(false);
  const [namaBarang, setNamaBarang] = useState<any>("");

  const [tanggalDari, setTanggalDari] = useState("");
  const [tanggalSampai, setTanggalSampai] = useState("");
  const [dataResult, setDataResult] = useState<any>([]);
  const [dataRiwayat, setDataRiwayat] = useState<any>([]);

  const generatePDF = async () => {
    let htmlContent =
      '<h1>Inventory Report</h1><table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">';
    htmlContent +=
      "<tr><th>Kode Barang</th><th>Nama Barang</th><th>Jumlah</th><th>Tipe</th><th>Tanggal</th></tr>";

    dataResult.forEach((item: any) => {
      htmlContent += `
        <tr>
          <td>${item.kode_barang}</td>
          <td>${item.nama_barang}</td>
          <td>${item.jumlah}</td>
          <td>${item.tipe}</td>
          <td>${item.tanggal}</td>
        </tr>
      `;
    });

    htmlContent += "</table>";

    try {
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
      });
      console.log("PDF disimpan di:", uri);

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("Gagal generate PDF:", error);
    }
  };

  const searchByFilter = () => {
    if (!tanggalDari || !tanggalSampai || !namaBarang?.nm_barang) {
      alert("Semua filter (tanggal dan nama barang) harus diisi.");
      return;
    }

    const filtered = dataRiwayat.filter((item: any) => {
      const itemTanggal = moment(item.tanggal_masuk).startOf("day");
      const dari = moment(tanggalDari).startOf("day");
      const sampai = moment(tanggalSampai).endOf("day");

      const cocokNama =
        item.nm_barang.trim().toLowerCase() ===
        namaBarang.nm_barang.trim().toLowerCase();

      const cocokTanggal = itemTanggal.isBetween(dari, sampai, undefined, "[]");

      return cocokNama && cocokTanggal;
    });

    setDataResult(filtered);
  };

  const getListRiwayat = async () => {
    try {
      const response = await axios.get(`${BASE_URL}barang_masuk_icon/list.php`);
      if (response.data.status === "success") {
        const data = response.data.data;

        setDataRiwayat(data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getListRiwayat();
  }, []);

  const seen = new Set();
  const filteredData = dataRiwayat.filter((item: any) => {
    if (seen.has(item.nm_barang)) {
      return false;
    }
    seen.add(item.nm_barang);
    return true;
  });

  const renderItem = ({ item }: any) => (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 14, marginHorizontal: 15, color: "black" }}>
        {item.kd_barang_masuk}
      </Text>
      <Text style={{ fontSize: 14, marginHorizontal: 15, color: "black" }}>
        {item.nm_barang}
      </Text>
      <Text style={{ fontSize: 14, marginHorizontal: 15, color: "black" }}>
        {moment(item.tanggal_masuk).format("YYYY-MM-DD")}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#1e81b0" barStyle="dark-content" />
      <View style={{ flex: 1, backgroundColor: "#abdbe3" }}>
        <ModalList
          title="Nama Barang"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          items={filteredData}
          handleSelect={(item: any) => setNamaBarang(item)}
        />
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
            {`Cari Riwayat Barang Masuk ${isIcon ? "Icon" : "Service"}`}
          </Text>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Tanggal Dari
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "black",
              paddingVertical: 5,
              marginBottom: 10,
            }}
            value={tanggalDari}
            keyboardType="numeric"
            onChangeText={(text) => setTanggalDari(text)}
            placeholder="Masukan Tanggal contoh : (2022-12-20)"
          />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Tanggal Ke
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "black",
              paddingVertical: 5,
              marginBottom: 10,
            }}
            value={tanggalSampai}
            keyboardType="numeric"
            onChangeText={(text) => setTanggalSampai(text)}
            placeholder="Masukan Tanggal contoh : (2022-12-20)"
          />
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginTop: 10,
              color: "black",
              textDecorationLine: "underline",
            }}
          >
            Nama Barang
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              justifyContent: "space-between",
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: namaBarang?.nm_barang ? "600" : "300",
                color: namaBarang?.nm_barang ? "black" : "#4c4c4c",
              }}
            >
              {namaBarang?.nm_barang ? namaBarang?.nm_barang : "Nama Barang"}
            </Text>
            <Icons
              name="arrow-down-drop-circle"
              size={20}
              color="black"
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={searchByFilter}
          style={{
            marginHorizontal: 20,
            backgroundColor: "#1e81b0",
            alignItems: "center",
            marginTop: 30,
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "white", fontWeight: "600" }}>
            CARI
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={generatePDF}
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            backgroundColor: "#1e81b0",
            alignItems: "center",
            marginTop: 20,
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "white", fontWeight: "600" }}>
            DOWNLOAD PDF
          </Text>
        </TouchableOpacity>

        <ScrollView horizontal style={{ flex: 1 }}>
          <View style={{ flex: 1, margin: 20 }}>
            {/* Table Header */}
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 10,
                backgroundColor: "#f0f0f0",
                borderBottomWidth: 2,
                borderBottomColor: "#1e81b0",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  marginHorizontal: 15,
                  color: "black",
                }}
              >
                Kode Barang
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  marginHorizontal: 15,
                  color: "black",
                }}
              >
                Nama Barang
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  marginHorizontal: 15,
                  color: "black",
                }}
              >
                Tanggal Masuk
              </Text>
            </View>
            {/* Table Data */}
            <FlatList
              data={dataResult}
              renderItem={renderItem}
              keyExtractor={(item) => item.kd_barang_masuk.toString()}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MasukSearchRiwayatScreen;
