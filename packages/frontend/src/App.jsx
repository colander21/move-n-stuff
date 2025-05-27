import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ContainersPage from "./pages/ContainersPage";
import ItemsPage from "./pages/ItemsPage";
import BoxesPage from "./pages/BoxesPage";
import ArchivePage from "./pages/ArchivePage";
import { useState } from "react";

function App() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const API_PREFIX = import.meta.env.VITE_API_BASE_URL;
  const [token, setToken] = useState(INVALID_TOKEN);

  console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
  console.log("VITE_API_BASE_URL:", API_PREFIX);

  function signupUser(creds) {
    return fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        const status = response.status;

        if (status === 201) {
          return response.json().then((payload) => {
            setToken(payload.token);
            return { status };
          });
        }
      })
      .catch((error) => {
        console.error(error);
        return { status: 500 };
      });
  }

  function loginUser(creds) {
    return fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        const status = response.status;
        if (status === 200) {
          return response.json().then((payload) => {
            setToken(payload.token);
            return { status: status };
          });
        } else {
          return { status: status };
        }
      })
      .catch((error) => {
        console.error(error);
        return { status: 500 };
      });
  }

  // Don't think we'll need this, just took from example
  // If we want to store list of users to allow for sharing containers, then it may be useful
  function fetchUsers() {
    const promise = fetch(`${API_PREFIX}/users`, {
      headers: addAuthHeader(),
    });

    return promise;
  }

  // THIS IS ONLY HERE TO IGNORE LINT ERROR
  // WILL BE PROPERLY USED LATER
  fetchUsers();

  // WILL USE THIS LATER TO PROTECT ENDPOINTS
  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage createUser={signupUser} loginUser={loginUser} />}
        />
        <Route path="/containers" element={<ContainersPage />} />
        <Route path={`/boxes/:id`} element={<BoxesPage />} />
        <Route path="/items/:boxID" element={<ItemsPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Routes>
    </Router>
  );
}

export default App;
