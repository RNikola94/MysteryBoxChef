import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const getPopularRecipes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/random`, {
      params: {
        number: 10,
        apiKey: API_KEY,
      },
    });
    return response.data.recipes;
  } catch (error) {
    console.error("Error fetching popular recipes:", error);
    return [];
  }
};

/**
 * Fetch personalized recipes based on user preferences.
 * @param {Array} dietaryPreferences - User's dietary preferences (e.g., vegan, gluten-free).
 * @param {Array} favoriteCuisines - User's favorite cuisines (e.g., Italian, Indian).
 * @param {Array} mealGoals - User's meal goals (e.g., weight loss, muscle gain).
 * @param {String} mealType - User's meal goals (e.g., weight loss, muscle gain).
 */
export const getPersonalizedRecipes = async (dietaryPreferences = [], favoriteCuisines = [], mealGoals = [], mealType = '') => {
  try {
    const queryParams = {
      apiKey: API_KEY,
      number: 10,
      diet: dietaryPreferences.length ? dietaryPreferences.join(',') : undefined,
      cuisine: favoriteCuisines.length ? favoriteCuisines.join(',') : undefined,
      type: mealType || undefined,
    };

    if (mealGoals.includes('weight loss')) {
      queryParams.maxCalories = 500;  // Low-calorie meals
    } else if (mealGoals.includes('muscle gain')) {
      queryParams.minProtein = 25;  // High-protein meals
    }

    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: queryParams,
    });

     console.log('RESP:', response.data);

    return response.data.results;
  } catch (error) {
    console.error('Error fetching personalized recipes:', error);
    return [];
  }
};

export const getTodaysMealPlan = async (userId) => {
  return {
    title: "Grilled Chicken with Quinoa Salad",
    description: "A healthy, protein-packed meal with grilled chicken and a refreshing quinoa salad."
  };
};

export const getUserGroceryList = async (userId) => {
  return [
    { name: "Chicken Breast", quantity: "2 lbs" },
    { name: "Quinoa", quantity: "1 cup" },
    { name: "Lemon", quantity: "2" },
    { name: "Olive Oil", quantity: "1 bottle" },
    { name: "Garlic", quantity: "3 cloves" },
    { name: "Cherry Tomatoes", quantity: "1 pint" },
  ];
};
