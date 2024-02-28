import "./App.css";
import { ColorsContextProvider } from "./contexts/colorsContext";
import LandingPage from "./components/LandingPage";
import { ApiColorsContextProvider } from "./contexts/apiColorsContext";
import "flowbite";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { google_client_id } from "./utils/variables";

function App() {
  const [showMobileWarning, setShowMobileWarning] = useState("");

  useEffect(() => {
    if (window.innerWidth <= 800)
      setShowMobileWarning("Please open this Application in Desktop/Laptop");
  }, []);
  return (
    <GoogleOAuthProvider clientId={google_client_id}>
      {showMobileWarning ? (
        <div className="w-[100vw] h-[100vh] bg-white">
          <div className="flex justify-center h-[100vh] items-center">
            <h1 className="text-2xl text-center">{showMobileWarning}</h1>
          </div>
        </div>
      ) : (
        <ColorsContextProvider>
          <ApiColorsContextProvider>
            <LandingPage />
          </ApiColorsContextProvider>
        </ColorsContextProvider>
      )}
    </GoogleOAuthProvider>
  );
}

export default App;
