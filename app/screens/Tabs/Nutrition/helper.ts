import { Food } from "@/app/types";
import { BASE_URL, USDA_FOOD_DATA_API_KEY } from "@/appConfig";
import axios from "axios";

export const getCalories = (food: Food) => {
    const calories = food.foodNutrients.find(
      (nutrient) => nutrient.nutrientName == "Energy"
    );
    return calories;
};

export const getFoodData = async (query: string) => {
    try {
      const response = await axios.get(BASE_URL + "foods/search", {
        params: {
          api_key: USDA_FOOD_DATA_API_KEY,
          query: query,
          pageSize: 10,
          pageNumber: 1,
          sortBy: "dataType.keyword",
        },
      });
      return response.data.foods
    } catch (error) {
      console.error(error);
      return []
    }
  };