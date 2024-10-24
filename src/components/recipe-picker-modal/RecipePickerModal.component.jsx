import { useState, useEffect } from 'react';
import { getPersonalizedRecipes } from '../../utils/spoonacular.utils';
import { useSelector } from 'react-redux';

const RecipePickerModal = ({ onSelectRecipe, onClose, mealType }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiet, setSelectedDiet] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchDefaultRecipes = async () => {
      try {
        const defaultRecipes = await getPersonalizedRecipes([], [], [], mealType);
        setRecipes(defaultRecipes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching default recipes:", error);
        setLoading(false);
      }
    };

    fetchDefaultRecipes();
  }, [mealType]);

  useEffect(() => {
    const fetchFilteredRecipes = async () => {
      if (!selectedDiet && !selectedCuisine) return;

      setLoading(true);
      try {
        const filteredRecipes = await getPersonalizedRecipes(
          selectedDiet ? [selectedDiet] : [], 
          selectedCuisine ? [selectedCuisine] : [],
          user.mealGoals, 
          mealType
        );
        setRecipes(filteredRecipes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching filtered recipes:", error);
        setLoading(false);
      }
    };

    fetchFilteredRecipes();
  }, [selectedDiet, selectedCuisine, mealType, user]);

  return (
    <div className="recipe-picker-modal">
      <h2>Select a Recipe for {mealType}</h2>

      {/* Filters: Diet and Cuisine */}
      <div>
        <label>Choose a Diet:</label>
        <select onChange={(e) => setSelectedDiet(e.target.value)} value={selectedDiet}>
          <option value="">Select Diet</option>
          {user.dietaryPreferences.map((diet) => (
            <option key={diet} value={diet}>{diet}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Choose a Cuisine:</label>
        <select onChange={(e) => setSelectedCuisine(e.target.value)} value={selectedCuisine}>
          <option value="">Select Cuisine</option>
          {user.favoriteCuisines.map((cuisine) => (
            <option key={cuisine} value={cuisine}>{cuisine}</option>
          ))}
        </select>
      </div>

      {/* Recipes List */}
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <button onClick={() => onSelectRecipe(recipe)}>
                {recipe.title}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes found. Please try again.</p>
      )}
      
      <button className="close-modal-button" onClick={onClose}>Close</button>
    </div>
  );
};

export default RecipePickerModal;
