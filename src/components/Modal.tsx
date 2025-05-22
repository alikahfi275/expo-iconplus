import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CModal = (props: any) => {
  const navigate: any = useNavigation();
  const { modalVisible, setModalVisible } = props;
  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginBottom: 40,
              color: "black",
            }}
          >
            Apakah Anda Yakin Ingin Keluar ?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                AsyncStorage.setItem("role", "");
              }}
            >
              <Text style={{ color: "black" }}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate.replace("Login")}>
              <Text style={{ color: "black" }}>Oke</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CModal;
