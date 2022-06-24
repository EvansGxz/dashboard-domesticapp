import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import SplashScreen from "../pages/SplashScreen";
import { GlobalStyle } from "../styles/global";

function UnAuthenticated() {
  return (
    <>
    <GlobalStyle />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/*" element={<SplashScreen />} />
        <Route path="/loading" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default UnAuthenticated;
