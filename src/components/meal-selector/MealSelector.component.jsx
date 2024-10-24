import { useState } from 'react';
import RecipePickerModal from '../recipe-picker-modal/RecipePickerModal.component';

const MealSelector = ({ day, mealType, selectedRecipe, onMealChange }) => {
  const [showModal, setShowModal] = useState(false);

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
          mealType={mealType}
        />
      )}
    </div>
  );
};

export default MealSelector;
