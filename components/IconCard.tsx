import {
  CardText,
  Colors,
  LeftIcon,
  StyledCard,
  StyledInputLabel,
  StyledTextInput,
  TopIcon,
} from "@/app/styles/styles";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View } from "react-native";

type CardType = React.ComponentProps<typeof StyledCard>;

// Define props interface using the correct Card type
export interface IconCardProps {
  text: string;
  icon: IconProp;
  cardProps?: Partial<CardType>;
}


const { brand, darkLight } = Colors;

const IconCard: React.FC<IconCardProps> = ({ text, icon, cardProps }) => {
  return (
    <View>
      <StyledCard {...cardProps}>
        <StyledCard.Content>
        <FontAwesomeIcon icon={icon} size={50} color="white" style={{marginVertical: 15}}/>
        <CardText>{text}</CardText>
        </StyledCard.Content>
      </StyledCard>
    </View>
  );
};

export default IconCard;
