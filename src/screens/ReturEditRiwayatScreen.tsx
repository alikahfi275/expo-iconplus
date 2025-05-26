import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ModalList from "../components/ModalList";
import Icons from "../components/Icons";
import ModalListItem from "../components/ModalListItem";
import axios from "axios";
import { BASE_URL } from "../api/api";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";

const ReturEditRiwayatScreen = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dataIcon, setDataIcon] = useState([]);
  const [pickItem, setPickItem] = useState<any>(null);
  const [kodeBarang, setKodeBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [tanggalRetur, setTanggalRetur] = useState("");
  const [supplier, setSupplier] = useState("");
  const [catatan, setCatatan] = useState("");
  const [tanggalKembali, setTanggalKembali] = useState("");
  const [stokBarang, setStokBarang] = useState(0);
  const [modalProsesVisible, setModalProsesVisible] = useState(false);
  const [status, setStatus] = useState<any>("");

  const isService = props?.route?.params?.isService || false;

  const routeName = isService ? "service" : "icon";
  const getListRiwayatIcon = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}riwayat/retur_list_${routeName}.php`
      );

      if (response.data.status === "success") {
        setDataIcon(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getListRiwayatIcon();
  }, []);

  const statusProses = [
    { label: "Proses", value: "proses" },
    { label: "Selesai", value: "selesai" },
  ];

  const handleSelect = (item: any) => {
    setPickItem(item);
    if (item.kode_barang) {
      setKodeBarang(item.kode_barang);
      setNamaBarang(item.nama_barang);
      setTanggalRetur(moment(item.tanggal).format("YYYY-MM-DD"));
      setStokBarang(Number(item.jumlah));
      setSupplier(item.supplier);
      setCatatan(item.catatan);
      setStatus(statusProses[0]);
    }
  };

  const handleIncrease = () => {
    setStokBarang((prev) => prev + 1); // Menambah 1
  };

  const handleDecrease = () => {
    if (stokBarang > 0) {
      setStokBarang((prev) => prev - 1); // Mengurangi 1, dengan pengecekan agar tidak negatif
    }
  };

  const updateItem = async () => {
    try {
      await axios.post(`${BASE_URL}barang_retur/edit_${routeName}.php`, {
        kode_barang: kodeBarang,
        nama_barang: namaBarang,
        tanggal_retur: tanggalRetur,
        jumlah: stokBarang,
        supplier: supplier,
        catatan: catatan,
        status: status?.value,
        tanggal_kembali: tanggalKembali,
      });

      setKodeBarang("");
      setNamaBarang("");
      setTanggalRetur("");
      setStokBarang(0);
      setSupplier("");
      setCatatan("");
      setStatus("");
      setPickItem(null);
      setTanggalKembali("");

      getListRiwayatIcon();
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: "#E6F1F7", flexGrow: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#abdbe3" }}>
        <ModalList
          title="Kode Barang"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          items={dataIcon}
          handleSelect={(item: any) => handleSelect(item)}
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
          Edit Barang Retur {isService ? "Service" : "Icon"}
        </Text>
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginTop: 10,
              color: "black",
              textDecorationLine: "underline",
            }}
          >
            Kode Barang
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
                fontWeight: pickItem?.kode_barang ? "600" : "300",
                color: pickItem?.kode_barang ? "black" : "#4c4c4c",
              }}
            >
              {pickItem?.kode_barang ? pickItem?.kode_barang : "0"}
            </Text>
            <Icons
              name="arrow-down-drop-circle"
              size={20}
              color="black"
              onPress={() => setModalVisible(true)}
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "black",
                marginTop: 5,
              }}
            >
              Nama Barang
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: "white",
                borderColor: "black",
                paddingVertical: 5,
                marginBottom: 10,
                marginTop: 5,
                paddingLeft: 10,
              }}
              value={namaBarang}
              onChangeText={setNamaBarang}
              placeholder="Nama Barang"
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "black",
                marginTop: 5,
              }}
            >
              Tanggal Retur
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: "white",
                borderColor: "black",
                paddingVertical: 5,
                marginBottom: 10,
                marginTop: 5,
                paddingLeft: 10,
              }}
              value={tanggalRetur}
              onChangeText={setTanggalRetur}
              placeholder="Tanggal Retur"
            />
          </View>

          <View style={{ marginTop: 10 }}>
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
                <Text
                  style={{ fontSize: 18, color: "black", fontWeight: "600" }}
                >
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
                value={String(stokBarang)}
                keyboardType="numeric"
                onChangeText={(text) => setStokBarang(Number(text))}
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
                <Text
                  style={{ fontSize: 18, color: "black", fontWeight: "600" }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "black",
                  marginTop: 10,
                }}
              >
                Supplier
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: "white",
                  borderColor: "black",
                  paddingVertical: 5,
                  marginBottom: 10,
                  marginTop: 5,
                  paddingLeft: 10,
                }}
                value={supplier}
                onChangeText={setSupplier}
                placeholder="Supplier"
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "black",
                  marginTop: 5,
                }}
              >
                Catatan
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: "white",
                  borderColor: "black",
                  paddingVertical: 5,
                  marginBottom: 10,
                  marginTop: 5,
                  paddingLeft: 10,
                }}
                value={catatan}
                onChangeText={setCatatan}
                placeholder="Catatan"
              />
            </View>
            <View style={{ marginTop: 10 }}>
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

            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "black",
                  marginTop: 5,
                }}
              >
                Tanggal Kembali
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: "white",
                  borderColor: "black",
                  paddingVertical: 5,
                  marginBottom: 10,
                  marginTop: 5,
                  paddingLeft: 10,
                }}
                value={tanggalKembali}
                onChangeText={setTanggalKembali}
                placeholder="Tanggal Kembali"
              />
            </View>
            <TouchableOpacity
              onPress={updateItem}
              style={{
                marginBottom: 40,
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
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ReturEditRiwayatScreen;
