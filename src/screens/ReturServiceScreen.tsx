import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Icons from "../components/Icons";
import ModalList from "../components/ModalList";
import axios from "axios";
import { BASE_URL } from "../api/api";
import { useFocusEffect } from "@react-navigation/native";
import ModalListItem from "../components/ModalListItem";
import { SafeAreaView } from "react-native-safe-area-context";

const ReturServiceScreen = () => {
  const [kodeBarang, setKodeBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState<any>("");
  const [tanggalRetur, setTanggalRetur] = useState("");
  const [jumlahBarang, setJumlahBarang] = useState(0);
  const [supplier, setSupplier] = useState("");
  const [status, setStatus] = useState<any>("");
  const [catatan, setCatatan] = useState("");
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [tanggalDiantar, setTanggalDiantar] = useState("");
  const [dataService, setDataService] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [modalProsesVisible, setModalProsesVisible] = useState(false);

  const statusProses = [
    { label: "Proses", value: "proses" },
    { label: "Selesai", value: "selesai" },
  ];

  const handleIncrease = () => {
    setJumlahBarang((prev) => prev + 1); // Menambah 1
  };

  const handleDecrease = () => {
    if (jumlahBarang > 0) {
      setJumlahBarang((prev) => prev - 1); // Mengurangi 1, dengan pengecekan agar tidak negatif
    }
  };

  const getListBarangService = async () => {
    try {
      const response = await axios.get(`${BASE_URL}barang/service/list.php`);
      if (response.data.status === "success") {
        setDataService(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getListBarangService();
    }, [])
  );

  const simpanRetur = async () => {
    try {
      await axios.post(`${BASE_URL}barang_retur/service.php`, {
        nama_barang: namaBarang?.nama_barang,
        kode_barang: kodeBarang,
        tanggal_retur: `${tanggalRetur} 00:00:00`,
        jumlah: jumlahBarang,
        supplier: supplier,
        status: status?.value,
        catatan: catatan,
        nama_pelanggan: namaPelanggan,
        tanggal_diantar: `${tanggalDiantar} 00:00:00`,
      });
      await axios.post(`${BASE_URL}riwayat/retur.php`, {
        kode_barang: kodeBarang,
        jumlah: jumlahBarang,
        tanggal: `${tanggalRetur} 00:00:00`,
        tipe: "service",
        status: status?.value,
        nama_barang: namaBarang?.nama_barang,
        catatan: catatan,
        supplier: supplier,
        nama_pelanggan: namaPelanggan,
        tanggal_dianter: `${tanggalDiantar} 00:00:00`,
      });

      setKodeBarang("");
      setNamaBarang("");
      setJumlahBarang(0);
      setSupplier("");
      setCatatan("");
      setStatus("");
      setTanggalRetur("");
      setNamaPelanggan("");
      setTanggalDiantar("");
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#abdbe3" }}>
      <ModalList
        title="Nama Barang"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        items={dataService}
        handleSelect={(item: any) => {
          setNamaBarang(item);
          setKodeBarang(item.kode_barang);
        }}
      />
      <ModalListItem
        title="Proses"
        modalVisible={modalProsesVisible}
        setModalVisible={setModalProsesVisible}
        items={statusProses}
        handleSelect={(item: any) => {
          setStatus(item);
        }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#abdbe3" }}>
        <View style={{ backgroundColor: "#FFFFA3" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 28,
              color: "black",
              fontWeight: "700",
              marginVertical: 5,
            }}
          >
            Barang Retur Service
          </Text>
        </View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "black",
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          Nama Barang
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: namaBarang?.nama_barang ? "600" : "300",
              color: namaBarang?.nama_barang ? "black" : "#4c4c4c",
              marginTop: 5,
            }}
          >
            {namaBarang?.nama_barang ? namaBarang?.nama_barang : "Nama Barang"}
          </Text>
          <Icons
            name="arrow-down-drop-circle"
            size={20}
            color="black"
            onPress={() => setModalVisible(true)}
          />
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Kode Barang Retur
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "black",
              paddingVertical: 5,
              marginBottom: 10,
            }}
            value={kodeBarang}
            onChangeText={(text) => setKodeBarang(text)}
            placeholder="Masukan Kode"
          />
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Tanggal Retur
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "black",
              paddingVertical: 5,
              marginBottom: 10,
            }}
            value={tanggalRetur}
            onChangeText={(text) => setTanggalRetur(text)}
            placeholder="Tanggal Retur"
          />
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Jumlah Barang
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={handleDecrease}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 25,
                backgroundColor: "#FFFFA3",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 18, color: "black", fontWeight: "600" }}>
                -
              </Text>
            </TouchableOpacity>

            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: "black",
                paddingVertical: 5,
                width: 100,
                textAlign: "center",
                fontSize: 16,
                fontWeight: "600",
              }}
              value={String(jumlahBarang)}
              keyboardType="numeric"
              onChangeText={(text) => setJumlahBarang(Number(text))}
            />

            <TouchableOpacity
              onPress={handleIncrease}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 25,
                backgroundColor: "#FFFFA3",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 18, color: "black", fontWeight: "600" }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Supplier
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "black",
              paddingVertical: 5,
              marginBottom: 10,
            }}
            value={supplier}
            onChangeText={(text) => setSupplier(text)}
            placeholder="Supplier"
          />
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Nama Pelanggan
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "black",
              paddingVertical: 5,
              marginBottom: 10,
            }}
            value={namaPelanggan}
            onChangeText={(text) => setNamaPelanggan(text)}
            placeholder="Nama Pelanggan"
          />
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Tanggal Diantar
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "black",
              paddingVertical: 5,
              marginBottom: 10,
            }}
            value={tanggalDiantar}
            onChangeText={(text) => setTanggalDiantar(text)}
            placeholder="Tanggal Diantar"
          />
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Status
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: status?.label ? "600" : "300",
                color: status?.label ? "black" : "#4c4c4c",
                marginTop: 5,
              }}
            >
              {status?.label ? status?.label : "Pilih Status"}
            </Text>
            <Icons
              name="arrow-down-drop-circle"
              size={20}
              color="black"
              onPress={() => setModalProsesVisible(true)}
            />
          </View>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>
            Catatan
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "black",
              paddingVertical: 5,
              marginBottom: 10,
            }}
            value={catatan}
            onChangeText={(text) => setCatatan(text)}
            placeholder="Catatan"
          />
        </View>
        <TouchableOpacity
          onPress={simpanRetur}
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            backgroundColor: "#FFFFA3",
            alignItems: "center",
            paddingVertical: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 16, color: "black", fontWeight: "600" }}>
            SIMPAN
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ReturServiceScreen;
