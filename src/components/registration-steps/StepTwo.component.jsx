import { useState } from 'react';

const dietaryOptions = ["Vegan", "Vegetarian", "Paleo", "Keto", "Gluten-free", "Dairy-free"];
const allergyOptions = ["Nuts", "Shellfish", "Dairy"];
const intoleranceOptions = ["Lactose", "Gluten"];
const eatingHabitOptions = ["Healthy eating", "Family meals", "Quick meals", "Weight loss"];
const deviceOptions = ["Mobile", "Tablet", "Desktop"];

const StepTwo = ({ nextStep, prevStep, setFormData, formData }) => {
  const [dietaryPreferences, setDietaryPreferences] = useState(formData.dietaryPreferences || []);
  const [allergies, setAllergies] = useState(formData.allergies || []);
  const [intolerances, setIntolerances] = useState(formData.intolerances || []);
  const [eatingHabits, setEatingHabits] = useState(formData.eatingHabits || []);
  const [preferredDevice, setPreferredDevice] = useState(formData.preferredDevice || '');

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
      dietaryPreferences,
      allergies,
      intolerances,
      eatingHabits,
      preferredDevice,
    });
    nextStep();
  };

  return (
    <div className="step-form">
      <h2>Dietary Preferences and Device Preference</h2>

      <div className="form-group">
        <label>Dietary Preferences (Select multiple):</label>
        {dietaryOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={dietaryPreferences.includes(option)}
              onChange={() => handleMultiSelect(option, dietaryPreferences, setDietaryPreferences)}
            />
            {option}
          </label>
        ))}
      </div>

      <div className="form-group">
        <label>Allergies (Select multiple):</label>
        {allergyOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={allergies.includes(option)}
              onChange={() => handleMultiSelect(option, allergies, setAllergies)}
            />
            {option}
          </label>
        ))}
      </div>

      <div className="form-group">
        <label>Intolerances (Select multiple):</label>
        {intoleranceOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={intolerances.includes(option)}
              onChange={() => handleMultiSelect(option, intolerances, setIntolerances)}
            />
            {option}
          </label>
        ))}
      </div>

      <div className="form-group">
        <label>Eating Habits (Select multiple):</label>
        {eatingHabitOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              value={option}
              checked={eatingHabits.includes(option)}
              onChange={() => handleMultiSelect(option, eatingHabits, setEatingHabits)}
            />
            {option}
          </label>
        ))}
      </div>

      <div className="form-group">
        <label>Preferred Device for Cooking:</label>
        {deviceOptions.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="preferredDevice"
              value={option}
              checked={preferredDevice === option}
              onChange={(e) => setPreferredDevice(e.target.value)}
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

export default StepTwo;
