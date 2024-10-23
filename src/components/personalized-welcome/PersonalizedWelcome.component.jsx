import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const PersonalizedWelcome = () => {
  const user = useSelector((state) => state.auth.user);
  const preferences = user?.preferences || [];
  const goals = user?.mealGoals || [];

  console.log(user);
  
  return (
    <section className="personalized-welcome">
      <motion.div 
        className="welcome-message"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>Welcome back, {user?.displayName || "Chef"}!</h2>
      </motion.div>
      
      <motion.div
        className="user-preferences"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {preferences.length > 0 ? (
          <p>Your dietary preferences: {preferences.join(', ')}.</p>
        ) : (
          <p>Explore new recipes today!</p>
        )}

        {goals.length > 0 && (
          <p>Your current meal goals: {goals.join(', ')}.</p>
        )}
      </motion.div>
    </section>
  );
};

export default PersonalizedWelcome;
