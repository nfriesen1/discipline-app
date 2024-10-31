import { BASE_URL, USDA_FOOD_DATA_API_KEY } from "@/appConfig";
import axios from "axios";
import qs from "qs";

interface SearchOptions {
  query: string;
  pageSize?: number;
  pageNumber?: number;
  dataType?: Array<"Branded" | "Survey (FNDDS)" | "SR Legacy" | "Foundation">;
  sortBy?: "dataType.keyword" | "lowercaseDescription.keyword" | "publishedDate" | "fdcId";
  sortOrder?: "asc" | "desc";
  brandOwner?: string;
  requireAllWords?: boolean;
}

interface FoodSearchResponse {
  foods: any[];
  currentPage: number;
  totalPages: number;
  totalHits: number;
}

export const getFoodData = async ({
  query,
  pageSize = 50,
  pageNumber = 1,
  dataType = ["Branded", "Survey (FNDDS)"],
  sortBy = "lowercaseDescription.keyword",
  sortOrder = "asc",
  brandOwner = "",
  requireAllWords = true
}: SearchOptions): Promise<FoodSearchResponse> => {
  try {
    // Clean and normalize the search query
    const normalizedQuery = query.trim().toLowerCase();
    
    // Build the search parameters
    const searchParams = {
      api_key: USDA_FOOD_DATA_API_KEY,
      query: normalizedQuery,
      pageSize,
      pageNumber,
      dataType,
      sortBy,
      sortOrder,
      brandOwner,
      requireAllWords
    };


    const response = await axios.get<FoodSearchResponse>(`${BASE_URL}foods/search`, {
      params: searchParams,
      paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    });

    console.log(response)

    // Add additional filtering and sorting
    let foods = response.data.foods;
    
    // Filter out items with missing essential data
    foods = foods.filter(food => (
      food.description &&
      food.foodNutrients &&
      food.foodNutrients.length > 0
    ));

    // Sort results by relevance score if available
    foods.sort((a, b) => {
      // Exact matches first
      const exactMatchA = a.description.toLowerCase().includes(normalizedQuery);
      const exactMatchB = b.description.toLowerCase().includes(normalizedQuery);
      if (exactMatchA && !exactMatchB) return -1;
      if (!exactMatchA && exactMatchB) return 1;
      
      // Then by description length (shorter descriptions often more relevant)
      return a.description.length - b.description.length;
    });

    return {
      foods,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      totalHits: response.data.totalHits
    };

  } catch (error) {
    console.error('Error fetching food data:', error);
    return {
      foods: [],
      currentPage: 1,
      totalPages: 0,
      totalHits: 0
    };
  }
};