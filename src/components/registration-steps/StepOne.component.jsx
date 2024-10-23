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

  const handleImageUpload = async (file) => {
    if (!file) return;
    
    const storageRef = ref(firebaseStorageDb, `profilePictures/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setPhotoURL(downloadURL);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleNext = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setFormData({
      ...formData,
      email,
      displayName,
      photoURL,
      password,
    });

    nextStep();
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
        <button onClick={() => handleImageUpload(photo)} disabled={!photo}>
          Upload Image
        </button>
        {photoURL && <p>Image uploaded successfully!</p>}
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

      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default StepOne;
