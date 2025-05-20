import "../styles/Grid.css";
// import "../styles/global.css";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BoxesPage() {
  const [boxes, setBoxes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const data_received = location.state;
  console.log("data received: ", data_received);

  const fetchBoxes = useCallback(() => {
    const promise = fetch(`http://localhost:8000/containers/${data_received}`);
    return promise;
  }, [data_received]);

  useEffect(() => {
    fetchBoxes()
      .then((res) => res.json())
      .then((json) => {
        console.log("API Response: ", json);
        setBoxes(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchBoxes]);

  console.log("Boxes: ", boxes);
  return (
    <div className="grid-box-pg">
      {boxes.map((item, index) => (
        <div key={index} onClick={() => navigate(`/items`)}>
          {item.tag}
        </div>
      ))}
    </div>
  );
}

export default BoxesPage;
