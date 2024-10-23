import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailSignUp } from '../../store/authSlice';
import { motion } from 'framer-motion';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase.utils';
import { useNavigate } from 'react-router-dom';

import StepOne from '../registration-steps/StepOne.component';
import StepTwo from '../registration-steps/StepTwo.component';
import StepThree from '../registration-steps/StepThree.component';
import StepFour from '../registration-steps/StepFour.component';

import './registration-form.styles.css';

const pageVariants = {
    initial: { opacity: 0, x: '-100vw' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '100vw' },
  };
  
  const pageTransition = {
    type: 'tween',
    duration: 0.5,
  };
  
  const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.auth);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
  
    const handleSubmit = async () => {
        const { email, password, displayName, ...otherData } = formData;
        try {
          const result = dispatch(emailSignUp({ email, password }));
          const uid = result.payload.uid;

          await setDoc(doc(db, "users", uid), {
            email,
            displayName,
            photoURL: formData.photoURL || '',
            dietaryPreferences: formData.dietaryPreferences || [],
            allergies: formData.allergies || [],
            intolerances: formData.intolerances || [],
            eatingHabits: formData.eatingHabits || [],
            preferredDevice: formData.preferredDevice || '',
            culinarySkill: formData.culinarySkill || '',
            favoriteCuisines: formData.favoriteCuisines || [],
            cookingSchedule: formData.cookingSchedule || [],
            mealGoals: formData.mealGoals || [],
          });

          navigate('/home');
      
          console.log('Registration and Firestore data complete.');
        } catch (error) {
          console.error('Registration failed:', error);
        }
      };
  
    const renderStep = () => {
      switch (step) {
        case 1:
          return <StepOne nextStep={nextStep} setFormData={setFormData} formData={formData} />;
        case 2:
          return <StepTwo nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
        case 3:
          return <StepThree nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} formData={formData} />;
        case 4:
          return <StepFour prevStep={prevStep} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} />;
        default:
          return null;
      }
    };
  
    return (
      <motion.div
        key={step}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="step-container"
      >
        {renderStep()}
      </motion.div>
    );
  };
  
  export default RegistrationForm;