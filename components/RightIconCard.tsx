import {
    CardText,
    Colors,
    LeftIcon,
    RightIcon,
    StyledCard,
    StyledInputLabel,
    StyledTextInput,
    TopIcon,
  } from "@/app/styles/styles";
  import { IconProp } from "@fortawesome/fontawesome-svg-core";
  import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
  import { View } from "react-native";
import { IconCardProps } from "./IconCard";
  
  
  const { brand, darkLight } = Colors;
  
  const RightIconCard: React.FC<IconCardProps> = ({ text, icon, cardProps }) => {
    return (
      <View>
        <StyledCard {...cardProps}>
          <StyledCard.Content>
          <CardText>{text}</CardText>
          <FontAwesomeIcon icon={icon} size={20} color="white" style={{marginLeft: "85%", marginBottom: 5}}/>
          </StyledCard.Content>
        </StyledCard>
      </View>
    );
  };
  
  export default RightIconCard;