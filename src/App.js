import { ColorsContextProvider } from "./contexts/colorsContext";
import LandingPage from "./components/LandingPage";

import "./App.css";

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
