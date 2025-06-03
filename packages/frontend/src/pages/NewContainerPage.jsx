import "../styles/Grid.css";
import "../styles/NewContainer.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewContainerPage() {
  const API_PREFIX = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [newContainerName, setContainerName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newContainerName.trim() !== "") {
      console.log("Submitting container:", newContainerName);

      fetch(`${API_PREFIX}/containers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          containerName: newContainerName,
          users: [{ userId: "681c3af252d3e9fc79726e16", role: "owner" }], // TODO: need to specify actual userId that should be passed when accessing the page
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Success:", data);
          navigate("/containers");
        })
        .catch((error) => {
          console.error("Error submitting container:", error);
        });
    }
  };

  const handleChange = (e) => {
    setContainerName(e.target.value);
  };

  const handleBackClick = () => {
    navigate("/containers");
  };

  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <button
          onClick={handleBackClick}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#f5e6c1",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
            fontFamily: "Courier New, monospace",
          }}
        >
          ← Back to Containers
        </button>
      </div>
      <div
        className="new-page-form-container"
        style={{ backgroundColor: "#c19a6b", minHeight: "100vh" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="new-page-form-login-group">
            <label htmlFor="newContainerName">New Container</label>
            <input
              type="text"
              id="newContainerName"
              name="containerName"
              placeholder="Type the name of your container"
              value={newContainerName}
              onChange={handleChange}
            />
            <div>
              <button type="submit" className="new-page-new-container-button">
                Add Container
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewContainerPage;
