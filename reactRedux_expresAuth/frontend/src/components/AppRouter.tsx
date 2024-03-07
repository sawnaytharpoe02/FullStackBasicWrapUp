import { Routes, Route, BrowserRouter } from "react-router-dom";
import MenuPage from "./Menu/MenuPage";
import MenuCategoryPage from "./MenuCategory/MenuCategoryPage";
import App from "../App";
import SignUp from "./AuthPage/SignUp";
import SignIn from "./AuthPage/SignIn";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu-category" element={<MenuCategoryPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
