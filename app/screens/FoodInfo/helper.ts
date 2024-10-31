import { Food } from "@/app/types";
import { BASE_URL, USDA_FOOD_DATA_API_KEY } from "@/appConfig";
import axios from "axios";
import qs from "qs";

export const getFoodDataByFdcId = async (fdcId: number) => {
    const request = BASE_URL + "food/"+fdcId

    try {
      const response = await axios.get(request, {
        params: {
          api_key: USDA_FOOD_DATA_API_KEY,
          nutrients: [203,204,205,208,269,307]
        },
        paramsSerializer: params => {
          return qs.stringify(params, {arrayFormat: 'repeat'})
        }
      });
      console.log(response.data.foodNutrients)
      return response.data
    } catch (error) {
      console.error(error);
      return []
    }
  };

  // axios.interceptors.request.use(request => {
  //   console.log('Starting Request', JSON.stringify(request, null, 2))
  //   return request
  // })
      
  // axios.interceptors.response.use(response => {
  //   console.log('Response:', JSON.stringify(response, null, 2))
  //   return response
  // })
