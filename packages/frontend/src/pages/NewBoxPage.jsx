import "../styles/Grid.css";
import "../styles/NewContainer.css";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NewBoxPage() {
  const API_PREFIX = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { containerID } = useParams();
  const persistantContainerId = containerID
  console.log("ContainerID from params: ", containerID)

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
          console.log("Success:", data);
          console.log(persistantContainerId)
          navigate(`/containers`);
        })
        .catch((error) => {
          console.error("Error submitting box:", error);
        });
    }
  };

  const handleChange = (e) => {
    setBoxName(e.target.value);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-login-group">
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
            <button type="submit" className="new-container-button">
              Add Box
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewBoxPage;
