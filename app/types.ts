import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList, RootStackParamList } from "./routes";
import { RouteProp } from "@react-navigation/native";


// Navigation
export type SignupScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "screens/Signup/Signup"
>;

export type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "screens/Login/Login"
>;

export type NutrientsNaviagationProp = StackNavigationProp<
  RootStackParamList,
  "screens/FoodInfo/FoodInfo"
>;

export type FoodInfoRouteProp = RouteProp<
  RootStackParamList,
  "screens/FoodInfo/FoodInfo"
>;

// Food Data

//ToDo fix typings
export interface Food {
    description: string;
    brandOwner: string;
    foodNutrients: foodNutrient[];
    fdcId: number
    servingSize: number
    servingSizeUnit: string
    labelNutrients: labelNutrients
}

interface foodNutrient {
    nutrientName: string;
    value: number;
    amount: number;
    unitName: string;
    nutrient: Nutrient
}

interface Nutrient {
  name: string;
  unitName: string;
}

export interface labelNutrients {
  fat: nutrientData;
  sodium: nutrientData;
  carbohydrates: nutrientData;
  sugars: nutrientData;
  protein: nutrientData;
  calories: nutrientData;
}

interface nutrientData {
  value: number
}
