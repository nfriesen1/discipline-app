import {
  ButtonText,
  InnerContainer,
  StyledButton,
  StyledContainer,
  StyledFormArea,
  Colors,
  StyledCard,
  CardText,
} from "../../../styles/styles";
import { useState } from "react";
import MyTextInput from "@/components/MyTextInput";
import { Formik } from "formik";
import { ScrollView } from "react-native";
import { Food, NutrientsNaviagationProp } from "../../../types";
import { getCalories, getFoodData } from "./helper";
interface ShapedFoodProps {
  food: Food;
}

interface Props {
  navigation: NutrientsNaviagationProp;
}

const Nutrition: React.FC<Props> = ({ navigation }) => {
  const { darkLight } = Colors;

  const [foodData, setFoodData] = useState<Food[]>([]);
  

  const FoodData = () => {
    return foodData.map((food, key) => {
      return (
        <StyledCard key={key} onPress={() => navigation.navigate("FoodInfo")}>
          <StyledCard.Content>
            <ShapedFoodData food={food} />
          </StyledCard.Content>
        </StyledCard>
      );
    });
  };

  const ShapedFoodData: React.FC<ShapedFoodProps> = ({ food }) => {
    return (
      <CardText>
        {food.description} {"\n"}
        {getCalories(food)?.value ? getCalories(food)?.value + "cal" : ""}
        {food.brandOwner && getCalories(food)?.value ? ", " : ""}
        {food.brandOwner ? food.brandOwner : ""}
      </CardText>
    );
  };

  return (
    <ScrollView>
      <StyledContainer>
        <InnerContainer>
          <Formik
            initialValues={{ query: "" }}
            onSubmit={async (values) => {
              console.log(values);
              setFoodData(await getFoodData(values.query))
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Food search"
                  icon="search"
                  placeholder="Something tasty..."
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("query")}
                  onBlur={handleBlur("query")}
                  value={values.query}
                />
                <StyledButton onPress={handleSubmit as any}>
                  <ButtonText>Search</ButtonText>
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
        <FoodData />
      </StyledContainer>
    </ScrollView>
  );
};

export default Nutrition;
