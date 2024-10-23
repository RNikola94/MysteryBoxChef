import { useState } from 'react';

const mealGoalsOptions = ["Weight loss", "Muscle gain", "Convenience", "Cuisine exploration"];

const StepFour = ({ prevStep, handleSubmit, setFormData, formData }) => {
  const [mealGoals, setMealGoals] = useState(formData.mealGoals || []);

  const handleMultiSelect = (option) => {
    if (mealGoals.includes(option)) {
      setMealGoals(mealGoals.filter((item) => item !== option));
    } else {
      setMealGoals([...mealGoals, option]);
    }
  };

  const handleFinish = () => {
    setFormData({
      ...formData,
      mealGoals,
    });
    handleSubmit();
  };

  return (
    <div className="step-form">
      <h2>Meal Goals</h2>

      <div className="form-group">
        <label>Meal Goals (Select multiple):</label>
        {mealGoalsOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={mealGoals.includes(option)}
              onChange={() => handleMultiSelect(option)}
            />
            {option}
          </label>
        ))}
      </div>

      <button onClick={prevStep}>Back</button>
      <button onClick={handleFinish}>Finish Registration</button>
    </div>
  );
};

export default StepFour;
