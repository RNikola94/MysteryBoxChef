import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { auth, googleAuthProvider, db } from "../utils/firebase.utils";
import { doc, getDoc, setDoc } from 'firebase/firestore';

const initialState = {
    user: null,
    loading: false,
    error: null
};

const getUserData = (user) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
});

// Async thunk to fetch user profile from Firestore
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (uid, { rejectWithValue }) => {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
            return userSnapshot.data();
        } else {
            throw new Error("User not found in Firestore");
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Async thunks for authentication with improved error handling
export const googleSignIn = createAsyncThunk('auth/googleSignIn', async (_, { dispatch, rejectWithValue }) => {
    try {
        const result = await signInWithPopup(auth, googleAuthProvider);
        const user = getUserData(result.user);
        
        const userProfile = await dispatch(fetchUserProfile(user.uid)).unwrap();
        return { ...user, ...userProfile };
    } catch (error) {
        let errorMessage = 'An error occurred during Google Sign-In.';
        if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = 'Sign-In popup was closed before completing. Please try again.';
        } else if (error.code === 'auth/network-request-failed') {
            errorMessage = 'Network error. Please check your internet connection.';
        }
        return rejectWithValue(errorMessage);
    }
});

export const emailSignIn = createAsyncThunk('auth/emailSignIn', async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = getUserData(result.user);
        
        const userProfile = await dispatch(fetchUserProfile(user.uid)).unwrap();
        
        return { ...user, ...userProfile };
    } catch (error) {
        let errorMessage = 'Failed to sign in with email and password.';
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No user found with this email.';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password. Please try again.';
        } else if (error.code === 'auth/network-request-failed') {
            errorMessage = 'Network error. Please check your internet connection.';
        }
        return rejectWithValue(errorMessage);
    }
});

// Updated emailSignUp thunk to store user in Firestore
export const emailSignUp = createAsyncThunk(
    'auth/emailSignUp',
    async ({ email, password, otherData }, { rejectWithValue }) => {
      try {
        // Step 1: Create a new user with email and password using Firebase Authentication
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = getUserData(result.user); // Extract serializable user data
  
        // Step 2: Store the additional data in Firestore under the new user's UID
        await setDoc(doc(db, 'users', user.uid), {
          ...otherData, // Add the other form data collected from the registration form
          email: user.email,
          createdAt: new Date().toISOString(), // Optionally store the creation timestamp
        });
  
        // Step 3: Return the user data (auth + Firestore)
        return { ...user, ...otherData }; // Merge user data from Firebase auth and Firestore
      } catch (error) {
        // Step 4: Error handling
        return rejectWithValue(error.message);
      }
    }
  );

export const logout = createAsyncThunk('auth/logout', async () => {
    await signOut(auth);
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(googleSignIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(googleSignIn.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(googleSignIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(emailSignIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(emailSignIn.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(emailSignIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(emailSignUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(emailSignUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(emailSignUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = { ...state.user, ...action.payload };
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export default authSlice.reducer;
