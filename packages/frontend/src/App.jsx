import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ContainersPage from "./pages/ContainersPage";
import ItemsPage from "./pages/ItemsPage";
import BoxesPage from "./pages/BoxesPage";
import ArchivePage from "./pages/ArchivePage";

function App() {
  function postUsers(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage createUser={postUsers} />} />
        <Route path="/containers" element={<ContainersPage />} />
        <Route path="/boxes" element={<BoxesPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Routes>
    </Router>
  );
}

export default App;
