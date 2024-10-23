import { useState } from 'react';
import { useSelector } from 'react-redux';
import RecipePickerModal from '../recipe-picker-modal/RecipePickerModal.component';

const MealSelector = ({ day, mealType, selectedRecipe, onMealChange }) => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.auth.user);


  const handleSelectRecipe = (recipe) => {
    onMealChange(day, mealType, recipe);
    setShowModal(false);
  };

  return (
    <div className="meal-selector">
      <button onClick={() => setShowModal(true)}>
        {selectedRecipe ? selectedRecipe.title : `Select ${mealType}`}
      </button>
      {showModal && (
        <RecipePickerModal
          onSelectRecipe={handleSelectRecipe}
          onClose={() => setShowModal(false)}
          user={user}
          mealType={mealType}
        />
      )}
    </div>
  );
};

export default MealSelector;
