import "../styles/Grid.css";
import "../styles/NewContainer.css";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NewBoxPage() {
  const API_PREFIX = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { containerID } = useParams();
  console.log("ContainerID from params: ", containerID);

  const [newBoxName, setBoxName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newBoxName.trim() !== "") {
      console.log("Submitting box:", newBoxName);

      console.log("Sending:", {
        ownerID: "681c3af252d3e9fc79726e16",
        containerID: containerID,
        tag: newBoxName,
      });

      fetch(`${API_PREFIX}/boxes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerID: "681c3af252d3e9fc79726e16",
          containerID: containerID,
          tag: newBoxName,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Redirecting to container:", containerID);
          navigate(`/boxes/${containerID}`);
        })
        .catch((error) => {
          console.error("Error submitting box:", error);
        });
    }
  };

  const handleChange = (e) => {
    setBoxName(e.target.value);
  };

  const handleBackClick = () => {
    navigate(`/boxes/${containerID}`);
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
          ← Back to Boxes
        </button>
      </div>
      <div
        className="new-page-form-container"
        style={{ backgroundColor: "#c19a6b", minHeight: "100vh" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="new-page-form-login-group">
            <label htmlFor="newBoxName">New Box</label>
            <input
              type="text"
              id="newBoxName"
              name="boxName"
              placeholder="Type the name of your box"
              value={newBoxName}
              onChange={handleChange}
            />
            <div>
              <button type="submit" className="new-page-new-container-button">
                Add Box
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewBoxPage;
