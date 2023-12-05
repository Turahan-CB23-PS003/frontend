import { Routes, Route, HashRouter } from "react-router-dom";
import HomePage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import MealsPage from "./pages/MealsPage";
import MealDetailPage from "./pages/MealDetailPage";
import RetailersPage from "./pages/RetailersPage";
import RetailerDetailPage from "./pages/RetailerDetailPage";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="meals" element={<MealsPage />} />
          <Route path="meals/:mealId" element={<MealDetailPage />} />
          <Route path="retailers" element={<RetailersPage />} />
          <Route path="retailers/:retailerId" element={<RetailerDetailPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
