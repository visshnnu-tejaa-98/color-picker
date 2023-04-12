import "./App.css";
import { ColorsContextProvider } from "./contexts/colorsContext";
import LandingPage from "./components/LandingPage";
import "flowbite";

function App() {
  return (
    <>
      <ColorsContextProvider>
        <LandingPage />
      </ColorsContextProvider>
    </>
  );
}

export default App;
