import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const Icons = (props: any) => {
  switch (props.type) {
    case "FontAwesome5":
      return <FontAwesome5 {...props} size={props.size} />;
    case "FontAwesome6":
      return <FontAwesome6 {...props} size={props.size} />;
    case "AntDesign":
      return <AntDesign {...props} size={props.size} />;
    case "Ionicons":
      return <Ionicons {...props} size={props.size} />;

    case "Feather":
      return <Feather {...props} size={props.size} />;

    case "MaterialIcons":
      return <MaterialIcons {...props} size={props.size} />;

    case "Entypo":
      return <Entypo {...props} size={props.size} />;

    default:
      return <MaterialCommunityIcons {...props} size={props.size} />;
  }
};

export default Icons;
