import { useEffect, useState } from 'react';
import { getTodaysMealPlan, getUserGroceryList } from '../../utils/spoonacular.utils';
import './meal-planning-grocery-preview.styles.css';

const MealPlanningGroceryPreview = ({ user }) => {
  const [todaysMealPlan, setTodaysMealPlan] = useState(null);
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    const fetchMealPlanAndGroceryList = async () => {
      if (user) {
        const mealPlan = await getTodaysMealPlan(user.id);
        const groceryListData = await getUserGroceryList(user.id);
        setTodaysMealPlan(mealPlan);
        setGroceryList(groceryListData);
      }
    };

    fetchMealPlanAndGroceryList();
  }, [user]);

  return (
    <section className="meal-planning-grocery-preview">
      <div className="meal-plan">
        <h2>Today's Meal Plan</h2>
        {todaysMealPlan ? (
          <div className="meal-card">
            <h3>{todaysMealPlan.title}</h3>
            <p>{todaysMealPlan.description}</p>
            <button>View Full Plan</button>
          </div>
        ) : (
          <p>No meal plan set for today.</p>
        )}
      </div>

      <div className="grocery-list">
        <h2>Your Grocery List</h2>
        {groceryList.length > 0 ? (
          <ul>
            {groceryList.slice(0, 5).map((item, index) => (
              <li key={index}>{item.name} - {item.quantity}</li>
            ))}
          </ul>
        ) : (
          <p>Your grocery list is empty.</p>
        )}
        <button>View Full List</button>
      </div>
    </section>
  );
};

export default MealPlanningGroceryPreview;
