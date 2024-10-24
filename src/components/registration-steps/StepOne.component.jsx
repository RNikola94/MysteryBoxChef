import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseStorageDb } from '../../utils/firebase.utils';

const StepOne = ({ nextStep, setFormData, formData }) => {
  const [email, setEmail] = useState(formData.email || '');
  const [displayName, setDisplayName] = useState(formData.displayName || '');
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(formData.photoURL || '');
  const [password, setPassword] = useState(formData.password || '');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uploading, setUploading] = useState(false); // Track upload state
  const [errorMessage, setErrorMessage] = useState(''); // Track errors

  // Handle Image Upload to Firebase
  const handleImageUpload = async (file) => {
    if (!file) return;
    
    const storageRef = ref(firebaseStorageDb, `profilePictures/${file.name}`);
    try {
      setUploading(true); // Start uploading
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setPhotoURL(downloadURL); // Set photo URL
      setUploading(false); // Stop uploading
    } catch (error) {
      console.error("Image upload failed:", error);
      setErrorMessage('Image upload failed. Please try again.');
      setUploading(false); // Stop uploading even on failure
    }
  };

  // Handle form submission and move to the next step
  const handleNext = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Upload the image if it's selected
    if (photo && !photoURL) {
      await handleImageUpload(photo);
    }

    // Update the form data after image upload
    setFormData({
      ...formData,
      email,
      displayName,
      photoURL,
      password,
    });

    nextStep(); // Move to the next step
  };

  return (
    <div className="step-form">
      <h2>Basic Information</h2>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Display Name:</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Profile Picture (Optional):</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button 
          onClick={() => handleImageUpload(photo)} 
          disabled={!photo || uploading}>
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
        {photoURL && <p>Image uploaded successfully!</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button 
        onClick={handleNext} 
        disabled={uploading}>
        Next
      </button>
    </div>
  );
};

export default StepOne;
