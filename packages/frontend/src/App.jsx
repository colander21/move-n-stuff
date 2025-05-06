import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExamplePage from "./pages/ExamplePage";
import ExamplePageTwo from "./pages/ExamplePageTwo";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExamplePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/example2" element={<ExamplePageTwo />} />
      </Routes>
    </Router>
  );
}

export default App;
