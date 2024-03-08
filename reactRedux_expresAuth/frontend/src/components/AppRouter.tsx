import { Routes, Route, BrowserRouter } from "react-router-dom";
import MenuPage from "./Menu/MenuPage";
import MenuCategoryPage from "./MenuCategory/MenuCategoryPage";
import App from "../App";
import SignUp from "./AuthPage/SignUp";
import SignIn from "./AuthPage/SignIn";
import PageTwo from "./pageTwo";
import PageOne from "./pageOne";
import PageThree from "./pageThree";
import PageFour from "./pageFour";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu-category" element={<MenuCategoryPage />} />
        <Route path="/page-one" element={<PageOne />} />
        <Route path="/page-two" element={<PageTwo />} />
        <Route path="/page-three" element={<PageThree />} />
        <Route path="/page-four" element={<PageFour />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
