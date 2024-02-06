import { Route, Routes } from "react-router";
import "./App.scss";
import { Wrapper } from "./components/Wrapper";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Wrapper />} />
    </Routes>
  );
}

export default App;
