import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ForgotPass from "./Components/ForgotPass"; // Corrected import statement
import ResetPassword from "./Components/ResetPassword";
import Mainpage from "./Components/Mainpage";
import Admin from "./Components/Admin"; // Adjust the path based on your file structure
import Quiz from "./Components/Quiz";
import Verbal from "./Components/Verbal";

// Corrected import statement

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotpassword" element={<ForgotPass />}></Route>{" "}
        <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
        <Route path="/Mainpage" element={<Mainpage />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/Quiz" element={<Quiz />}></Route>
        <Route path="/Verbal" element={<Verbal />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
