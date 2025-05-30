import {
  View,
  Text,
  Modal,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";

const ModalList = (props: any) => {
  const {
    modalVisible,
    setModalVisible,
    items,
    handleSelect,
    title,
    typeRetur,
  } = props;
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
              fontWeight: "bold",
              marginBottom: 10,
              color: "black",
            }}
          >
            Pilih {title}
          </Text>
          <ScrollView style={{ maxHeight: 300 }}>
            {items.map((item: any, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(item)}
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: index !== items.length - 1 ? 1 : 0,
                  borderBottomColor: "#ddd",
                }}
              >
                {typeRetur ? (
                  <Text
                    style={{
                      fontSize: 16,
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    {item.kd_barang_rt}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    {title === "Kode Barang"
                      ? item.kd_barang_icon
                        ? item.kd_barang_icon
                        : item.kd_barang_service
                      : item.nm_barang}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{
              marginTop: 15,
              padding: 10,
              alignSelf: "flex-end",
            }}
          >
            <Text style={{ color: "#72B4D3" }}>Tutup</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalList;
