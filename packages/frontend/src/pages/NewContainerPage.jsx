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
          users: [{ userId: "681c3af252d3e9fc79726e16", role: "owner" }], // need to specify actual userId that should be passed when accessing the page
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

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-login-group">
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
            <button type="submit" className="new-container-button">
              Add Container
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewContainerPage;
