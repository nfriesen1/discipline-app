import { StackNavigationProp } from "@react-navigation/stack";
import { MessageBox, StyledContainer } from "../../styles/styles";
import { RootStackParamList } from "../../routes";
import { Food } from "../../types";

interface FoodInfoProps  {
    food: Food 
}
const FoodInfo:React.FC<FoodInfoProps> = ({food}) => {
    return(
        <StyledContainer>
            <MessageBox>{food.description}</MessageBox>
        </StyledContainer>
    )
}

export default FoodInfo;