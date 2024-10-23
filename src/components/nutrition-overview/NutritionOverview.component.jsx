import { useState, useEffect } from 'react';
import './nutrition-overview.styles.css';

const mockNutritionData = {
  calories: 1800,
  protein: 120,
  carbs: 200,
  fats: 70,
};

const NutritionOverview = ({ user }) => {
  const [nutritionData, setNutritionData] = useState(null);

  useEffect(() => {
    const fetchNutritionData = async () => {
      setNutritionData(mockNutritionData);
    };

    if (user) {
      fetchNutritionData();
    }
  }, [user]);

  if (!nutritionData) {
    return <div>Loading Nutrition Data...</div>;
  }

  const { calories, protein, carbs, fats } = nutritionData;

  return (
    <section className="nutrition-overview">
      <h2>Your Daily Nutrition Overview</h2>
      <div className="nutrition-stats">
        <div className="stat">
          <span className="stat-value">{calories}</span>
          <span className="stat-label">Calories</span>
        </div>
        <div className="stat">
          <span className="stat-value">{protein}g</span>
          <span className="stat-label">Protein</span>
        </div>
        <div className="stat">
          <span className="stat-value">{carbs}g</span>
          <span className="stat-label">Carbs</span>
        </div>
        <div className="stat">
          <span className="stat-value">{fats}g</span>
          <span className="stat-label">Fats</span>
        </div>
      </div>
    </section>
  );
};

export default NutritionOverview;
