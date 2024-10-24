import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
// const API_KEY = "ae18b17b2bdb401aa58f2ee5ccb8edf8";
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
 * @param {String} mealType - Type of meal (e.g., breakfast, lunch, dinner).
 */
export const getPersonalizedRecipes = async (
  dietaryPreferences = [],
  favoriteCuisines = [],
  mealGoals = [],
  mealType = '' // Passed meal type, such as breakfast, lunch, or dinner
) => {
  try {
    // Construct query parameters
    const queryParams = {
      apiKey: API_KEY,
      number: 10, // Number of recipes to fetch
    };

    // Add dietary preferences if any
    if (dietaryPreferences.length > 0) {
      queryParams.diet = dietaryPreferences.join(',');
    }

    // Add favorite cuisines if any
    if (favoriteCuisines.length > 0) {
      queryParams.cuisine = favoriteCuisines.join(',');
    }

    // Add meal type, ensure proper formatting (e.g., lowercase)
    if (mealType) {
      queryParams.type = mealType.toLowerCase(); // Use lowercase to match API spec
    }

    // Apply meal goals to tweak the query
    if (mealGoals.includes('weight loss')) {
      queryParams.maxCalories = 500; // Low-calorie meals for weight loss
    } else if (mealGoals.includes('muscle gain')) {
      queryParams.minProtein = 25; // High-protein meals for muscle gain
    }

    // Log the full API request query for debugging
    console.log('Querying API with:', queryParams);

    // Make the API call
    const response = await axios.get(`${BASE_URL}/complexSearch`, { params: queryParams });

    // Log the full API response for debugging
    console.log('API Response:', response.data);

    // Ensure the response contains results
    if (response.data && response.data.results) {
      return response.data.results;
    } else {
      console.error("No results found for this query:", response.data);
      return [];
    }
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
