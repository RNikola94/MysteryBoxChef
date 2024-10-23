import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import MealSelector from '../../components/meal-selector/MealSelector.component';
import { useSelector } from 'react-redux';
import { db } from '../../utils/firebase.utils';
import './meal-plan-creation.styles.css';


const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const MealPlanCreation = () => {
  const user = useSelector((state) => state.auth.user);

  const [mealPlan, setMealPlan] = useState({
    Monday: { breakfast: '', lunch: '', dinner: '' },
    Tuesday: { breakfast: '', lunch: '', dinner: '' },
    Wednesday: { breakfast: '', lunch: '', dinner: '' },
    Thursday: { breakfast: '', lunch: '', dinner: '' },
    Friday: { breakfast: '', lunch: '', dinner: '' },
    Saturday: { breakfast: '', lunch: '', dinner: '' },
    Sunday: { breakfast: '', lunch: '', dinner: '' },
  });

  const handleMealChange = (day, mealType, recipe) => {
    setMealPlan((prevPlan) => ({
      ...prevPlan,
      [day]: { ...prevPlan[day], [mealType]: recipe },
    }));
  };

  const saveMealPlan = async () => {
    try {
      await setDoc(doc(db, 'mealPlans', user.uid), { mealPlan });
      alert('Meal Plan saved successfully!');
    } catch (error) {
      console.error('Error saving meal plan: ', error);
    }
  };

  return (
    <section className="meal-plan-creation">
      <h2>Create Your Weekly Meal Plan</h2>
      <div className="meal-plan-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="meal-plan-day">
            <h3>{day}</h3>
            <div className="meal-selection">
              <MealSelector
                day={day}
                mealType="breakfast"
                selectedRecipe={mealPlan[day].breakfast}
                onMealChange={handleMealChange}
              />
              <MealSelector
                day={day}
                mealType="lunch"
                selectedRecipe={mealPlan[day].lunch}
                onMealChange={handleMealChange}
              />
              <MealSelector
                day={day}
                mealType="dinner"
                selectedRecipe={mealPlan[day].dinner}
                onMealChange={handleMealChange}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="save-plan-button" onClick={saveMealPlan}>Save Meal Plan</button>
    </section>
  );
};

export default MealPlanCreation;
