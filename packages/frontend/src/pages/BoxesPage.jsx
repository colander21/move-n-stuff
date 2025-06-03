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
  const token = sessionStorage.getItem("token");

  const fetchBoxes = useCallback(() => {
    const promise = fetch(`${API_PREFIX}/containers/${containerID}`, {
      headers: {
        Authorization: token,
      },
    });
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
    return (
      <div className="boxes-header">
        <button onClick={() => navigate("/containers")} className="back-button">
          ← Back to Containers
        </button>
        <h1 className="header-title">Your Boxes</h1>
        <button
          onClick={() => navigate(`/print/${containerID}`)}
          className="qr-nav-button"
        >
          Print Box QR Codes
        </button>
      </div>
    );
  }

  console.log("Boxes: ", boxes);
  console.log("ContainerID: ", containerID);
  return (
    <div>
      <Header />
      <div className="grid-box-pg">
        {boxes.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              item.tag.endsWith(".png")
                ? navigate(`/new-box/${containerID}`)
                : navigate(`/items/${item._id}`);
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
