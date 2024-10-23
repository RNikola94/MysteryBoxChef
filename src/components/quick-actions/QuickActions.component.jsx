import { useNavigate } from 'react-router-dom';
import './quick-actions.styles.css';

const QuickActions = () => {
  const navigate = useNavigate();

  const handleCreateMealPlan = () => {
    navigate('/meal-plan/create');
  };

  const handleUploadRecipe = () => {
    navigate('/recipe/upload');
  };

  const handleExploreCommunity = () => {
    navigate('/community/explore');
  };

  return (
    <section className="quick-actions">
      <h2>Quick Actions</h2>
      <div className="actions-container">
        <div className="action-card" onClick={handleCreateMealPlan}>
          <img src="/images/create-meal-plan-icon.png" alt="Create Meal Plan" />
          <h3>Create New Meal Plan</h3>
        </div>
        <div className="action-card" onClick={handleUploadRecipe}>
          <img src="/images/upload-recipe-icon.png" alt="Upload a Recipe" />
          <h3>Upload a Recipe</h3>
        </div>
        <div className="action-card" onClick={handleExploreCommunity}>
          <img src="/images/explore-community-icon.png" alt="Explore Community" />
          <h3>Explore Community</h3>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
