import "../styles/Grid.css";
import "../styles/ContainersPage.css";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import plus_sign from "../images/plus_sign.png";

function BoxesPage() {
  const API_PREFIX = import.meta.env.VITE_API_BASE_URL;

  const [boxes, setBoxes] = useState([]);
  const navigate = useNavigate();
  const { containerID } = useParams();

  const fetchBoxes = useCallback(() => {
    const promise = fetch(`${API_PREFIX}/containers/${containerID}`);
    return promise;
  }, [containerID, API_PREFIX]);

  useEffect(() => {
    fetchBoxes()
      .then((res) => res.json())
      .then((json) => {
        console.log("API Response: ", json);
        setBoxes([...json, { tag: plus_sign }]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchBoxes]);

  function Header() {
    return <div className="header">Your Boxes</div>;
  }

  const handleBackClick = () => {
    navigate("/containers");
  };

  console.log("Boxes: ", boxes);
  console.log("ContainerID: ", containerID);
  return (
    <div>
      <Header />
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
            fontFamily: "Courier New, monospace"
          }}
        >
          ← Back to Containers
        </button>
      </div>
      <div className="grid-box-pg">
        {boxes.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              item.tag.endsWith(".png")
                ? navigate(`/new-box/${containerID}`)
                : navigate(`/items/`, { state: item._id });
            }}
          >
            {item.tag.endsWith(".png") ? (
              <img
                src={item.tag}
                alt="Add New"
                style={{ width: "125px", height: "125px" }}
              />
            ) : (
              item.tag
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoxesPage;
