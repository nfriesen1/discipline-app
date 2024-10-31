import {
  Colors,
  InnerContainer,
  NutrientGrid,
  PageTitle,
  StyledContainer,
  SubTitle,
} from "../../styles/styles";
import { Food, FoodInfoRouteProp, labelNutrients, NutrientsNaviagationProp } from "../../types";
import { getFoodDataByFdcId } from "./helper";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import IconCard from "@/components/IconCard";

import {
  faBoltLightning,
  faBreadSlice,
  faCheese,
  faDrumstickBite,
  faIceCream,
  faPizzaSlice,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";


interface Props {
  navigation: NutrientsNaviagationProp;
  route: FoodInfoRouteProp;
}

type LabelNutrientKey = keyof labelNutrients;

const NUTRIENT_ORDER: (keyof labelNutrients)[] = [
  'calories',
  'protein',
  'fat',
  'carbohydrates',
  'sugars',
  'sodium'
];

const labelToNutrientName: { [K in LabelNutrientKey]: string } = {
  fat: "Total lipid (fat)",
  sodium: "Sodium, Na",
  carbohydrates: "Carbohydrate, by difference",
  sugars: "Total Sugars",
  protein: "Protein",
  calories: "Energy"
};

const nutrientIconMap: { [key: string]: IconProp } = {
  Protein: faDrumstickBite,
  "Carbohydrate, by difference": faBreadSlice,
  "Total lipid (fat)": faCheese,
  Energy: faBoltLightning,
  "Total Sugars": faIceCream,
  "Sodium, Na": faPizzaSlice
};

const nutrientNameMap: { [key: string]: string } = {
  Protein: "Protein",
  "Carbohydrate, by difference": "Carbs",
  "Total lipid (fat)": "Fat",
  Energy: "",
  "Total Sugars": "Sugar",
  "Sodium, Na": "Sodium"
};

const FoodInfo: React.FC<Props> = ({ route }) => {
  const { fdcId } = route.params;
  const [food, setFood] = useState<Food>();
  const { brand } = Colors;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFoodDataByFdcId(fdcId);
      setFood(result);
    };

    fetchData();
  }, []);

  if (!food) {
    return <ActivityIndicator size="large" color={brand} />;
  }

  const NutrientData = () => {
    return (
      <NutrientGrid>
        {NUTRIENT_ORDER.map((labelKey, index) => {
          const nutrientName = labelToNutrientName[labelKey];
          const nutrientData = food.labelNutrients[labelKey];
          
          // Find the corresponding nutrient for the unit name
          const nutrient = food.foodNutrients.find(
            n => n.nutrient.name === nutrientName
          );
  
          if (nutrientData && nutrient) {
            return (
              <View key={labelKey} style={{ width: '48%' }}>
                <IconCard
                  icon={nutrientIconMap[nutrientName]}
                  text={`${nutrientData.value}${nutrient.nutrient.unitName} ${nutrientNameMap[nutrientName]}`}
                />
              </View>
            );
          }
          return null;
        })}
      </NutrientGrid>
    );
  };

  //ToDo add way to change units of serving size
  return (
    <StyledContainer>
      <PageTitle>{food.description}</PageTitle>
      <SubTitle style={{textAlign: "center" }}>Serving size: {food.servingSize}{food.servingSizeUnit}</SubTitle>
      <InnerContainer>
        <NutrientData />
      </InnerContainer>
    </StyledContainer>
  );
};

export default FoodInfo;
