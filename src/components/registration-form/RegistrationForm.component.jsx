import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { emailSignUp } from '../../store/authSlice';
import StepOne from '../registration-steps/StepOne.component';
import StepTwo from '../registration-steps/StepTwo.component';
import StepThree from '../registration-steps/StepThree.component';
import StepFour from '../registration-steps/StepFour.component';
import { motion } from 'framer-motion'; // Import Framer Motion

import './registration-form.styles.css'
// Framer Motion variants for transitions
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
  const [step, setStep] = useState(1); // To manage the current step
  const [formData, setFormData] = useState({}); // To store all the user's inputs
  const dispatch = useDispatch();

  // Proceed to the next step
  const nextStep = () => setStep(step + 1);

  // Go back to the previous step
  const prevStep = () => setStep(step - 1);

  // Handle form submission
  const handleSubmit = async () => {
    const { email, password, ...otherData } = formData; // Extract email/password and additional form data
  
    try {
      // Dispatch the emailSignUp thunk, passing email, password, and other form data
      dispatch(emailSignUp({ email, password, otherData }));
      console.log('User registered successfully and data stored in Firestore:', otherData);
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
      key={step} // Re-render when the step changes
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