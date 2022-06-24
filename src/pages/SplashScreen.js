import { useState } from "react";
import { Navigate } from "react-router-dom";

function SplashScreen() {
  //document.body.style.backgroundColor ='#FF7864';
  const [redirectNow, setRedirectNow] = useState(false);
  setTimeout(() => setRedirectNow(true), 4000);
  return redirectNow ? (
    <Navigate to="login" />
  ) : (
    <div className="SplashScreen">
      <h1 style={{textAlign:'center'}} >Loading...</h1>
    </div>
  );
}

export default SplashScreen;