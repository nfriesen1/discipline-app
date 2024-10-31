import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, ExtraText, LeftIcon } from "@/app/styles/styles";

interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  checked,
  onToggle,
}) => {
  const { brand } = Colors;

  return (
    <>
      <ExtraText>{label}</ExtraText>
      <TouchableOpacity
        onPress={onToggle}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 8,
          paddingVertical: 4,
        }}
      >
        <Ionicons
          name={checked ? "checkbox" : "square-outline"}
          size={24}
          color={brand}
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>
    </>
  );
};

export default CheckboxInput;
