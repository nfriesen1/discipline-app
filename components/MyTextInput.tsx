import {
  Colors,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
} from "@/app/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { TextInputProps, View } from "react-native";

export interface MyTextInputProps extends TextInputProps {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}

const { brand, darkLight } = Colors;

const MyTextInput: React.FC<MyTextInputProps> = ({ label, icon, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Ionicons name={icon} size={30} color={brand}></Ionicons>
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
    </View>
  );
};

export default MyTextInput;
