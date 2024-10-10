import { View } from "react-native";
import { MyTextInputProps } from "./MyTextInput";
import {
  Colors,
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledTextInput,
} from "@/app/styles/styles";
import { Ionicons } from "@expo/vector-icons";

interface MyPasswordInputProps extends MyTextInputProps {
  hidePassword: boolean;
  setHidePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const { brand, darkLight } = Colors;

const MyPasswordInput: React.FC<MyPasswordInputProps> = ({
  label,
  icon,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Ionicons name={icon} size={30} color={brand}></Ionicons>
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      <RightIcon onPress={() => setHidePassword(!hidePassword)}>
        <Ionicons
          name={hidePassword ? "eye-off" : "eye"}
          size={30}
          color={darkLight}
        />
      </RightIcon>
    </View>
  );
};

export default MyPasswordInput;
