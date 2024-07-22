import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import GLOBAL_ROUTE from "./helpers/GlobalRoute";
import AboutPage from "./pages/AboutPage";
import MealsPage from "./pages/MealsPage";
import MealDetailPage from "./pages/MealDetailPage";
import RetailersPage from "./pages/RetailersPage";
import RetailerDetailPage from "./pages/RetailerDetailPage";
import UserPage from "./pages/UserPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";

const GlobalContext = createContext();

const App = () => {
  const [userData, setUserData] = useState({});
  const [userIdToken, setUserIdToken] = useState({
    userId: Cookies.get("user_id"),
    userAccessToken: Cookies.get("user_accessToken"),
  });

  const globalContextValue = {
    userIdToken,
    userData,
    setUserIdToken,
    setUserData,
  };

  useEffect(() => {
    try {
      const getUserData = async () => {
        if (userIdToken.userId && userIdToken.userAccessToken) {
          const response = await axios.get(
            `${GLOBAL_ROUTE}api/v1/users/${userIdToken.userId}`,
            {
              headers: {
                Authorization: `Bearer ${userIdToken.userAccessToken}`,
              },
            },
          );
          setUserData(response.data.data.users);
        }
      };
      getUserData();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userIdToken]);

  return (
    <GlobalContext.Provider value={globalContextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="meals" element={<MealsPage />} />
            <Route path="meals/:mealId" element={<MealDetailPage />} />
            <Route path="retailers" element={<RetailersPage />} />
            <Route
              path="retailers/:retailerId"
              element={<RetailerDetailPage />}
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<UserPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

export { GlobalContext };
export default App;
