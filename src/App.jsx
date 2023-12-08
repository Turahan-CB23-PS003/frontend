import { Routes, Route, HashRouter } from "react-router-dom";
import { createContext, useMemo, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import GLOBAL_ROUTE from "./helpers/GlobalRoute";
import HomePage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import MealsPage from "./pages/MealsPage";
import MealDetailPage from "./pages/MealDetailPage";
import RetailersPage from "./pages/RetailersPage";
import RetailerDetailPage from "./pages/RetailerDetailPage";
import UserPage from "./pages/UserPage";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";

const GlobalContext = createContext();

const App = () => {
  const userId = Cookies.get("user_id") ? Cookies.get("user_id") : null;
  const userAccessToken = Cookies.get("user_accessToken")
    ? Cookies.get("user_accessToken")
    : null;
  const [userData, setUserData] = useState({});

  const [userIdToken, setUserIdToken] = useState({
    userId: Cookies.get("user_id") ? Cookies.get("user_id") : null,
    userAccessToken: Cookies.get("user_accessToken")
      ? Cookies.get("user_accessToken")
      : null,
  });

  const globalContextValue = useMemo(() => {
    return {
      userIdToken,
      userData,
      setUserIdToken,
      setUserData,
    };
  }, [userIdToken, userData]);

  useEffect(() => {
    try {
      const getUserData = async () => {
        if (userId && userAccessToken) {
          const response = await axios.get(
            `${GLOBAL_ROUTE}/api/v1/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${userAccessToken}`,
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
  }, [userId, userAccessToken]);

  return (
    <GlobalContext.Provider value={globalContextValue}>
      <HashRouter>
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
            <Route path="profile" element={<UserPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </GlobalContext.Provider>
  );
};

export { GlobalContext };
export default App;
