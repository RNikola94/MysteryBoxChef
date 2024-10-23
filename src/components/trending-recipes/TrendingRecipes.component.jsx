import { useState, useEffect } from 'react';
import './trending-recipes.styles.css';

const mockTrendingRecipes = [
  { id: 1, title: "Pancakes", category: "Breakfast", image: "https://via.placeholder.com/150" },
  { id: 2, title: "Avocado Toast", category: "Breakfast", image: "https://via.placeholder.com/150" },
  { id: 3, title: "Caesar Salad", category: "Lunch", image: "https://via.placeholder.com/150" },
  { id: 4, title: "Grilled Chicken", category: "Dinner", image: "https://via.placeholder.com/150" },
  { id: 5, title: "Spaghetti Bolognese", category: "Dinner", image: "https://via.placeholder.com/150" },
  { id: 6, title: "Smoothie Bowl", category: "Breakfast", image: "https://via.placeholder.com/150" },
  { id: 7, title: "Tacos", category: "Lunch", image: "https://via.placeholder.com/150" },
  { id: 8, title: "Steak", category: "Dinner", image: "https://via.placeholder.com/150" },
];

const TrendingRecipes = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredRecipes(mockTrendingRecipes);
    } else {
      setFilteredRecipes(
        mockTrendingRecipes.filter((recipe) => recipe.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner'];

  return (
    <section className="trending-recipes">
      <h2>Trending Recipes</h2>

      <div className="filter-options">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingRecipes;
