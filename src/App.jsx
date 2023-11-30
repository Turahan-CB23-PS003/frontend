import { Routes, Route, HashRouter } from "react-router-dom";
import HomePage from "./pages/Homepage";
import AboutUs from "./pages/AboutUs";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutUs />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
