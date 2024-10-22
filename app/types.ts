import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList, RootStackParamList } from "./routes";


// Navigation
export type SignupScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Signup"
>;

export type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

export type NutrientsNaviagationProp = StackNavigationProp<
  RootStackParamList,
  "FoodInfo"
>;

// Food Data

export interface Food {
    description: string;
    brandOwner: string;
    foodNutrients: foodNutrient[];
}

interface foodNutrient {
    nutrientName: string;
    value: number;
    unitName: string;
}
