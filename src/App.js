import "./App.css";
import { ColorsContextProvider } from "./contexts/colorsContext";
import LandingPage from "./components/LandingPage";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <ColorsContextProvider>
        <LandingPage />
        <Outlet />
      </ColorsContextProvider>
    </>
  );
}

export default App;
