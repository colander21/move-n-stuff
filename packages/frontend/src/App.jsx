import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ContainersPage from "./pages/ContainersPage";
import ItemsPage from "./pages/ItemsPage";
import BoxesPage from "./pages/BoxesPage";
import ArchivePage from "./pages/ArchivePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/containers" element={<ContainersPage />} />
        <Route path="/boxes" element={<BoxesPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Routes>
    </Router>
  );
}

export default App;
