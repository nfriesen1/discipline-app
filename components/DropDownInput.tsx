import { View } from "react-native";
import { MyTextInputProps } from "./MyTextInput";
import {
  Colors,
  LeftCalendarIcon,
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledTextInput,
} from "@/app/styles/styles";
import { Ionicons } from "@expo/vector-icons";

interface DropDownInputProps extends MyTextInputProps {
  isOpened: boolean;
//   openDropdown: () => void
}

const { brand } = Colors;


const DropDownInput: React.FC<DropDownInputProps> = ({
  label,
  icon,
  isOpened,
//   openDropdown,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Ionicons name={icon} size={30} color={brand}></Ionicons>
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      <RightIcon>
        <Ionicons
          name={isOpened ? "chevron-down": "chevron-up"}
          size={30}
          color={brand}
          style={isOpened ? {
            opacity: 50
          }: {opacity:100}}
        />
      </RightIcon>
    </View>
  );
};

export default DropDownInput;
