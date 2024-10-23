import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailSignIn, googleSignIn } from '../../store/authSlice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase.utils';
import { browserSessionPersistence, setPersistence, browserLocalPersistence } from 'firebase/auth';
import './login.styles.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleEmailLogin = async () => {
    try {
      const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistenceType);
      dispatch(emailSignIn({ email, password }));
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      dispatch(googleSignIn());
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div className="login-container">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <h2>Welcome Back!</h2>
        <p>Please log in to continue.</p>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group remember-me">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={loading}
            />
            Remember Me
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="btn-primary" onClick={handleEmailLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <button className="btn-google" onClick={handleGoogleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Sign in with Google'}
        </button>

        <div className="forgot-password">
          <a href="#">Forgot your password?</a>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
