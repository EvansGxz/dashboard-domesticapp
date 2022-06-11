import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { Navigate } from "react-router-dom";

function Authenticated() {
  const { user } = useAuth();
  return (
    <>
      <Routes>
      </Routes>
    </>
  );
}
export default Authenticated;
