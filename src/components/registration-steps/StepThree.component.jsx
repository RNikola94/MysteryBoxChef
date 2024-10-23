import { useState } from 'react';

const skillOptions = ["Beginner", "Intermediate", "Advanced"];
const cuisineOptions = ["Italian", "Indian", "Mexican", "Asian", "Mediterranean"];
const scheduleOptions = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const StepThree = ({ nextStep, prevStep, setFormData, formData }) => {
  const [culinarySkill, setCulinarySkill] = useState(formData.culinarySkill || '');
  const [favoriteCuisines, setFavoriteCuisines] = useState(formData.favoriteCuisines || []);
  const [cookingSchedule, setCookingSchedule] = useState(formData.cookingSchedule || []);

  const handleMultiSelect = (option, selectedOptions, setSelectedOptions) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleNext = () => {
    setFormData({
      ...formData,
      culinarySkill,
      favoriteCuisines,
      cookingSchedule,
    });
    nextStep();
  };

  return (
    <div className="step-form">
      <h2>Culinary Skill, Favorite Cuisines, and Cooking Schedule</h2>

      <div className="form-group">
        <label>Culinary Skill Level:</label>
        {skillOptions.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="culinarySkill"
              value={option}
              checked={culinarySkill === option}
              onChange={(e) => setCulinarySkill(e.target.value)}
            />
            {option}
          </label>
        ))}
      </div>

      <div className="form-group">
        <label>Favorite Cuisines (Select multiple):</label>
        {cuisineOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={favoriteCuisines.includes(option)}
              onChange={() => handleMultiSelect(option, favoriteCuisines, setFavoriteCuisines)}
            />
            {option}
          </label>
        ))}
      </div>

      <div className="form-group">
        <label>Cooking Schedule (Select multiple):</label>
        {scheduleOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={cookingSchedule.includes(option)}
              onChange={() => handleMultiSelect(option, cookingSchedule, setCookingSchedule)}
            />
            {option}
          </label>
        ))}
      </div>

      <button onClick={prevStep}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default StepThree;
