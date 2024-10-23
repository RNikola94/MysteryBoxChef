import { useEffect, useState, useRef } from 'react';
import { getPopularRecipes, getPersonalizedRecipes } from '../../utils/spoonacular.utils';
import './featured-recipes.styles.css';

const FeaturedRecipes = ({ user }) => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [personalizedRecipes, setPersonalizedRecipes] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      const recipes = await getPopularRecipes();
      setPopularRecipes(recipes);
    };

    const fetchPersonalizedRecipes = async () => {
      if (user) {
        const recipes = await getPersonalizedRecipes(user.dietaryPreferences, user.favoriteCuisines, user.mealGoals);
        setPersonalizedRecipes(recipes);
      }
    };

    fetchPopularRecipes();
    fetchPersonalizedRecipes();
  }, [user]);

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    const scrollAmount = direction === 'left' ? -300 : 300;
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="featured-recipes">
      <h2>Popular Recipes</h2>
      <div className="carousel-container">
        <button className="carousel-button left" onClick={() => scrollCarousel('left')}>
          &#10094;
        </button>
        <div className="carousel" ref={carouselRef}>
          {popularRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
              <button>View Recipe</button>
            </div>
          ))}
        </div>
        <button className="carousel-button right" onClick={() => scrollCarousel('right')}>
          &#10095;
        </button>
      </div>

      {user && (
        <>
          <h2>Recommended for You</h2>
          <div className="carousel-container">
            <button className="carousel-button left" onClick={() => scrollCarousel('left')}>
              &#10094;
            </button>
            <div className="carousel" ref={carouselRef}>
              {personalizedRecipes.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                  <img src={recipe.image} alt={recipe.title} />
                  <h3>{recipe.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
                  <button>View Recipe</button>
                </div>
              ))}
            </div>
            <button className="carousel-button right" onClick={() => scrollCarousel('right')}>
              &#10095;
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedRecipes;
