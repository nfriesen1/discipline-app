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

interface EditUserInfoProps extends MyTextInputProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const { brand, darkLight } = Colors;

const EditUserInfo: React.FC<EditUserInfoProps> = ({
  label,
  icon,
  isEditing,
  setIsEditing,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Ionicons name={icon} size={30} color={brand}></Ionicons>
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      <RightIcon onPress={() => setIsEditing(!isEditing)}>
        <Ionicons
          name={isEditing ? "close-circle-sharp": "pencil"}
          size={30}
          color={darkLight}
          style={isEditing ? {
            opacity: 50
          }: {opacity:100}}
        />
      </RightIcon>
    </View>
  );
};

export default EditUserInfo;
