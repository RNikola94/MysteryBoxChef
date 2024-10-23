import { useState, useEffect } from 'react';
import { getPersonalizedRecipes } from '../../utils/spoonacular.utils';
import { useSelector } from 'react-redux';

const RecipePickerModal = ({ onSelectRecipe, onClose, mealType }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  console.log(user);
  console.log('Recipes', recipes);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const fetchedRecipes = await getPersonalizedRecipes(
          user.dietaryPreferences, 
          user.favoriteCuisines, 
          user.mealGoals, 
          mealType
        );
        setRecipes(fetchedRecipes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [user, mealType]);

  return (
    <div className="recipe-picker-modal">
      <h2>Select a Recipe for {mealType}</h2>
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
        <p>No recipes found for {mealType}. Please try again later.</p>
      )}
      <button className="close-modal-button" onClick={onClose}>Close</button>
    </div>
  );
};

export default RecipePickerModal;
