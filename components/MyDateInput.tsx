import { View, TouchableOpacity } from "react-native";
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

interface MyDateInputProps extends MyTextInputProps {
    show: boolean;
    showDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
}

const { brand, darkLight } = Colors;

const MyDateInput: React.FC<MyDateInputProps> = ({
  label,
  icon,
  show,
  showDatePicker,
  ...props
}) => {
  return (
    <View>
      <LeftCalendarIcon onPress={() => showDatePicker(!show)}>
        <Ionicons name={icon} size={30} color={brand}></Ionicons>
      </LeftCalendarIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} editable={false}/>
    </View>
  );
};

export default MyDateInput;
