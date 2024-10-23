import { motion } from 'framer-motion';
import './hero-section.styles.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <img src="/images/hero-bg.jpg" alt="Cooking Background" className="background-image" />
        {/* <video autoPlay loop muted className="background-video">
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video> */}
      </div>
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          Explore, Create, Share
        </motion.h1>
        <motion.p 
          className="hero-description"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5, duration: 1 }}
        >
          Your personalized culinary journey starts here.
        </motion.p>
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1, duration: 1 }}
        >
          <button className="cta-button explore-recipes">Explore Recipes</button>
          <button className="cta-button create-meal-plan">Create Meal Plan</button>
          <button className="cta-button join-community">Join the Community</button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
