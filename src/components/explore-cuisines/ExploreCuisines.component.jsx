import { useState, useEffect } from 'react';
import './explore-cuisines.styles.css';

const cuisines = [
  { id: 1, name: 'Italian', image: 'https://via.placeholder.com/150?text=Italian' },
  { id: 2, name: 'Mexican', image: 'https://via.placeholder.com/150?text=Mexican' },
  { id: 3, name: 'Indian', image: 'https://via.placeholder.com/150?text=Indian' },
  { id: 4, name: 'Asian', image: 'https://via.placeholder.com/150?text=Asian' },
  { id: 5, name: 'Mediterranean', image: 'https://via.placeholder.com/150?text=Mediterranean' },
  { id: 6, name: 'French', image: 'https://via.placeholder.com/150?text=French' },
  { id: 7, name: 'American', image: 'https://via.placeholder.com/150?text=American' },
  { id: 8, name: 'Thai', image: 'https://via.placeholder.com/150?text=Thai' },
];

const mockRecipes = {
  Italian: [
    { id: 1, title: 'Pasta Carbonara', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Margherita Pizza', image: 'https://via.placeholder.com/150' },
  ],
  Mexican: [
    { id: 3, title: 'Tacos', image: 'https://via.placeholder.com/150' },
    { id: 4, title: 'Burritos', image: 'https://via.placeholder.com/150' },
  ],
  Indian: [
    { id: 5, title: 'Chicken Curry', image: 'https://via.placeholder.com/150' },
    { id: 6, title: 'Naan Bread', image: 'https://via.placeholder.com/150' },
  ],
};

const ExploreCuisines = () => {
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    if (selectedCuisine) {
      setFilteredRecipes(mockRecipes[selectedCuisine] || []);
    }
  }, [selectedCuisine]);

  return (
    <section className="explore-cuisines">
      <h2>Explore by Cuisines</h2>

      <div className="cuisine-grid">
        {cuisines.map((cuisine) => (
          <div 
            key={cuisine.id} 
            className={`cuisine-card ${selectedCuisine === cuisine.name ? 'active' : ''}`} 
            onClick={() => setSelectedCuisine(cuisine.name)}
          >
            <img src={cuisine.image} alt={cuisine.name} />
            <h3>{cuisine.name}</h3>
          </div>
        ))}
      </div>

      {selectedCuisine && (
        <div className="filtered-recipes">
          <h3>{selectedCuisine} Recipes</h3>
          <div className="recipe-grid">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                  <img src={recipe.image} alt={recipe.title} />
                  <h4>{recipe.title}</h4>
                </div>
              ))
            ) : (
              <p>No recipes found for {selectedCuisine}.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ExploreCuisines;
