import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import SignUp from "./Routes/SignUp";
import Login from "./Routes/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="signUp" element={ <SignUp /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
