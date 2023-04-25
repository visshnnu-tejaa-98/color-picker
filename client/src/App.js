import "./App.css";
import { ColorsContextProvider } from "./contexts/colorsContext";
import LandingPage from "./components/LandingPage";
import { ApiColorsContextProvider } from "./contexts/apiColorsContext";
import "flowbite";

function App() {
  return (
    <>
      <ColorsContextProvider>
        <ApiColorsContextProvider>
          <LandingPage />
        </ApiColorsContextProvider>
      </ColorsContextProvider>
    </>
  );
}

export default App;
