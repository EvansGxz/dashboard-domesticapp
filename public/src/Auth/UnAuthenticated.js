import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";

function UnAuthenticated() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default UnAuthenticated;
