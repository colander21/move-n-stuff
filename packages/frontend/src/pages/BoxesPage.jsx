import "../styles/Grid.css";
import "../styles/ContainersPage.css";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import plus_sign from "../images/plus_sign.png";

function BoxesPage() {
  const API_PREFIX = import.meta.env.VITE_API_BASE_URL;

  const [boxes, setBoxes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const data_received = location.state;
  console.log("data received: ", data_received);

  const fetchBoxes = useCallback(() => {
    const promise = fetch(`${API_PREFIX}/containers/${data_received}`);
    return promise;
  }, [data_received, API_PREFIX]);

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

  console.log("Boxes: ", boxes);
  return (
    <div>
      <Header />
      <div className="grid-box-pg">
        {boxes.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              item.tag.endsWith(".png")
                ? navigate(`/newbox/`, { state: item._id })
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
