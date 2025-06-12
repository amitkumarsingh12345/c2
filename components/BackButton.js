import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { constant } from "@/constants/constant";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function BackButton() {

  return (
    <TouchableOpacity onPress={() => router.back()}>
      <MaterialIcons
      name="arrow-back-ios"
      size={constant.platform == 'ios'? 30: 25}
      color={'#045fa5'}
      style={{
        position: "fixed",
        top: constant.platform == 'ios'? 20: 40,
        left: 30,
      }}
    />
    </TouchableOpacity>
  );
}
