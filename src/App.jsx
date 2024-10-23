import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./utils/firebase.utils"
import { fetchUserProfile } from "./store/authSlice"

import RootLayout from "./rootLayout"
import Error from "./pages/error/Error.page"
import Home from "./pages/home/Home.page"
import RegistrationForm from "./components/registration-form/RegistrationForm.component"
import LoginPage from "./pages/login/Login.page"
import MealPlanCreation from "./pages/meal-plan-creation/MealPlanCreation.component"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchUserProfile(user.uid));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'register',
          element: <RegistrationForm />
        },
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: '/meal-plan/create',
          element: <MealPlanCreation />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
