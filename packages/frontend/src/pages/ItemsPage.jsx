import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ItemsPage.css";
import ItemsTable from "../components/ItemsTable.jsx";
import "../styles/global.css";

function ItemsPage() {
  const { boxID } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const url = boxID
      ? `http://localhost:8000/api/items?boxID=${boxID}`
      : `http://localhost:8000/api/items`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Failed to fetch items:", err));
  }, [boxID]);

  return (
    <div className="items-page">
      <h1 className="header">Box Name</h1>
      <div className="textInput-bar">
        <span className="material-icons">edit</span> {/* Edit icon */}
      </div>
      <div className="add-bar">
        <span className="material-icons">add_box</span> {/* Add Box icon */}
      </div>
      <div className="mic-bar">
        <span className="material-icons">mic</span> {/* Mic icon */}
      </div>
      <div className="photo-bar">
        <span className="material-icons">camera_alt</span> {/* Camera icon */}
      </div>
      <ItemsTable itemsData={items} />
    </div>
  );
}

export default ItemsPage;
